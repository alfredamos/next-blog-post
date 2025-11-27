import {Token} from "@prisma/client";
import prisma from "../db/prisma.db";
import {StatusCodes} from "http-status-codes";
import {ResponseMessageUtil} from "@/utils/responseMessage.util";
import {ownerCheckOrAdmin} from "@/utils/ownerCheckOrAdmin.util";
import {CustomError} from "@/utils/customError.util";
import {QueryConditionUtil} from "@/utils/queryCondition.util";
import {adminUserUtil} from "@/utils/adminUser.util";

class TokenModel{
    async createToken(token: Token){
        //----> Insert the token into db.
        await prisma.token.create({
            data: {...token}
        })

        //----> Send back the response.
        return new ResponseMessageUtil("Token has been created successfully!", "success", StatusCodes.CREATED);
    }

    async deleteInvalidTokensByUserId(userId: string){
        //----> Check for ownership or admin.
        if (!await ownerCheckOrAdmin(userId)){
            throw new CustomError("Forbidden", "You don't have permission to view or perform any action on this page!", StatusCodes.FORBIDDEN)
        }

        //----> Retrieve invalid tokens by user id.
        const queryCondition: QueryConditionUtil = {
            userId,
            expired: true,
            revoked: true
        };

        //----> Delete all invalid tokens by user id.
        return await this.deletedTokensByQuery(queryCondition);
    }

    async deleteAllInvalidTokens(){
        //----> Must be an admin.
        if (!await adminUserUtil()){
            throw new CustomError("Forbidden", "You don't permission to view or perform this action!", StatusCodes.FORBIDDEN)
        }

        //----> Retrieve all invalid tokens.
        const queryCondition: QueryConditionUtil = {
            expired: true,
            revoked: true
        };

        //----> Delete all invalid tokens.
        return await this.deletedTokensByQuery(queryCondition);
    }

    async findTokenByAccessToken(accessToken: string){
        //----> Fetch the token object with the given access-token.
        const token = await this.getOneToken(accessToken);

        //----> Send back response.
        return token;
    }

    async findAllValidTokensByUserId(userId: string){
        //----> Retrieve all valid tokens.
        const queryCondition : QueryConditionUtil = {
            userId,
            revoked:false,
            expired:false
        }

        //----> Send back valid tokens.
        return this.findInvalidOrValidTokens(queryCondition);
    }

    async revokedTokensByUserId(userId: string){
        //----> Retrieve all valid tokens.
        const validTokens = await this.findAllValidTokensByUserId(userId);

        //----> invalidate tokens and save them in the db.
        return this.invalidateTokensAndSave(validTokens);
    }


    private async deletedTokensByQuery(queryCondition: QueryConditionUtil) {
        const invalidTokens = this.findInvalidOrValidTokens(queryCondition);

        //----> Collect all invalid tokens id in an array.
        const invalidTokenIds = (await invalidTokens).map(token => token.id);

        //----> Delete all in valid tokens.
        const batchDeletedTokens = await prisma.token.deleteMany({
            where: {
                id: {
                    in: invalidTokenIds
                }
            }
        });

        //----> Check for empty counts.
        if (!batchDeletedTokens.count) {
            throw new CustomError("Not found", "No invalid tokens to delete!", StatusCodes.NOT_FOUND);
        }

        //----> Send back response.
        return new ResponseMessageUtil("All invalid tokens have been deleted!", "success", StatusCodes.OK);
    }

    private getOneToken = async(accessToken: string) => {
        //----> Fetch the token object with the given access-token.
        const token = await prisma.token.findUnique({where:{accessToken}});

        //----> Check for error.
        if (!token) {
            throw new CustomError("Not found", "Token is not found.", StatusCodes.NOT_FOUND);
        }

        return token;

    }

    private findInvalidOrValidTokens = async(queryCondition: QueryConditionUtil) => {
        //----> Retrieve valid or invalid tokens.
        return prisma.token.findMany({where: queryCondition});
    }

    private invalidateTokensAndSave = async(tokens : Token[]) => {
        //----> Invalidate tokens and save them in the db.
        const invalidatedTokens = tokens.map(async token => {
            token.expired = true;
            token.revoked = true;
            return prisma.token.update({
                where: {id : token.id},
                data: {...token}
            })
        });

        //----> Send back response.
        return Promise.all(invalidatedTokens);
    }
}

export const tokenModel = new TokenModel();