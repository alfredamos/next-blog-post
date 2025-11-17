import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { cookies } from 'next/headers';
import {StatusCodes} from "http-status-codes";
import {Author, Role, Token, TokenType} from "@prisma/client";
import {CustomError} from "@/utils/customError.util";
import prisma from "@/db/prisma.db";
import {ResponseMessageUtil} from "@/utils/responseMessage.util";
import {fromEditProfileToAuthorUtil} from "@/utils/fromEditProfileToAuthor.util";
import {toUserDto} from "@/dto/toUser.dto";
import {CookieParam} from "@/utils/cookieParam.util";
import {tokenModel} from "@/models/token.model";
import {validateUserToken} from "@/utils/validateToken.util";
import {ChangeUserPassword, EditUserProfile, LoginUser, SignupUser} from "@/validations/auth.validation";
import {TokenJwt} from "@/utils/tokenJwt.util";

class AuthModel{
    async changeUserPassword(req: ChangeUserPassword){
        //----> Destructure req.
        const {email, password, confirmPassword, newPassword} = req;

        //----> Check for password match.
        if (!this.checkForPasswordMatch(confirmPassword, newPassword)){
            return new CustomError("Bad request", "Passwords don't match!", StatusCodes.BAD_REQUEST);
        }

        //----> Check for existence of user.
        const user = await this.getUserByEmail(email);

        //----> Check for error
        if (user instanceof CustomError) {
            return user;
        }

        //----> Check for valid password.
        if (! await this.checkForValidPassword(password, user.password)){
            return new CustomError("UnAuthorized", "Invalid credentials!", StatusCodes.UNAUTHORIZED);
        }

        //----> Hash the new password.
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        //----> Save the new password in the db.
        await prisma.user.update({where: {email}, data: {...user, password: hashedPassword}});

        //----> Send back response.
        return new ResponseMessageUtil("Password has been changed successfully!", "success", StatusCodes.OK);

    }

    async editUserProfile(req: EditUserProfile){
        //----> Destructure req.
        const {email, password} = req;

        //----> Check for existence of user.
        const user = await this.getUserByEmail(email);

        //----> Check for error
        if (user instanceof CustomError) {
            return user;
        }

        //----> Check for valid password.
        if (! await this.checkForValidPassword(password, user.password)){
            return new CustomError("UnAuthorized", "Invalid credentials!", StatusCodes.UNAUTHORIZED);
        }

        //----> Update the user.
        user.image = req.image;
        user.name = req.name;
        await prisma.user.update({ where: {email}, data: {...user}});

        //----> Update author.
        const author = await this.getAuthorByEmail(email);

        //----> Check for error
        if (author instanceof CustomError) {
            return author;
        }

        const updatedAuthor = {...fromEditProfileToAuthorUtil(req, user.id), id: author.id};
        await prisma.author.update({where: {email}, data: {...updatedAuthor}});

        //----> Send back response.
        return new ResponseMessageUtil("User profile has been updated successfully!", "success", StatusCodes.OK);
    }

    getCurrentUser = async (email:string) => {
        //----> Fetch the current user from db.
        const user = await this.getUserByEmail(email);

        //----> Check for error
        if (user instanceof CustomError) {
            return user;
        }

        return toUserDto(user);
    }


    async loginUser(req: LoginUser){
        //----> Destructure req.
        const {email, password} = req;

        //----> Check for existence of user.
        const user = await this.getUserByEmail(email);

        //----> Check for error
        if (user instanceof CustomError) {
            return user;
        }

        //----> Check for valid password.
        if (! await this.checkForValidPassword(password, user.password)){
            return new CustomError("UnAuthorized", "Invalid credentials!", StatusCodes.UNAUTHORIZED);
        }

        //----> Generate access and refresh tokens and store them in cookies and send back access token.
        return await this.generateAccessAndRefreshTokensByUser(user);
    }

    logoutUser = async () => {
        //----> Get the access token from cookies on request body.
        const cookieStore = await cookies();
        const accessToken = cookieStore.get(CookieParam.accessTokenName)?.value as string;

        //----> Check for null access token.
        if (!accessToken) {
            await this.deleteAllCookies();
            return new CustomError("Null Token", "You have already logged out!", StatusCodes.UNAUTHORIZED);
        }

        //----> Get the valid token object.
        const tokenObject = await tokenModel.findTokenByAccessToken(accessToken);

        if (!tokenObject ||(tokenObject instanceof CustomError)){
            return new CustomError("Token is empty", "Invalid credentials!", StatusCodes.UNAUTHORIZED);
        }

        //----> Delete access-token, refresh-token and session-token.
        await this.deleteCookie(CookieParam.accessTokenName);
        await this.deleteCookie(CookieParam.refreshTokenName);
        await this.deleteCookie(CookieParam.sessionTokenName);

        //----> Revoke all valid tokens.
        await tokenModel.revokedTokensByUserId(tokenObject.userId);

        //----> Send back response.
        return new ResponseMessageUtil("Logout is successfully!", "success", StatusCodes.OK);
    }

    refreshUserToken = async (refreshToken: string) => {
        //----> Check for null refresh token.
        if (!refreshToken) {
            return  new CustomError("No refreshToken", "Your refresh token has expired", StatusCodes.UNAUTHORIZED);
        }

        //----> Validate refresh token.
        const userToken = validateUserToken(refreshToken as string);

        //----> Check for null userToken
        if (!userToken) {
            return new CustomError("UnAuthorized", "Invalid credentials!", StatusCodes.UNAUTHORIZED);
        }

        //----> Generate access and refresh tokens and store them in cookies and send back access token.
        return await this.generateAccessAndRefreshTokensByUser(userToken as TokenJwt);

    }

    signupUser = async (signupUser: SignupUser)=>{
        //----> Destructure signupUser.
        const {email, password, confirmPassword} = signupUser;

        //----> Check for password match.
        if (!this.checkForPasswordMatch(password, confirmPassword)){
            return new CustomError("UnAuthorized", "Passwords don't match!", StatusCodes.BAD_REQUEST);
        }

        //----> Check for existence of user.
        const user = await prisma.user.findUnique({where: {email}})
        if (user){
            return new CustomError("UnAuthorized", "User already exist!", StatusCodes.UNAUTHORIZED);
        }

        //----> Hash password.
        const hashedPassword = await bcrypt.hash(password, 12);

        //----> Save the new user in the database.
        const newUser = await prisma.user.create({data: {email:signupUser.email, name: signupUser.name, image: signupUser.image, password: hashedPassword, role: Role.User}})

        //----> Save the associated author in its db.
        const newAuthor = this.fromSignupUserToAuthor(signupUser, newUser.id) as Author;
        await prisma.author.create({data: {...newAuthor}});

        //----> Send back response.
        return new ResponseMessageUtil("Signup is successfully!", "success", StatusCodes.OK);

    }

    checkForPasswordMatch(passwordOne: string, passwordTwo: string){
        return passwordOne.normalize() === passwordTwo.normalize();
    }

    private checkForValidPassword(rawPassword: string, encodedPassword: string){
        return bcrypt.compare(rawPassword, encodedPassword);
    }

    private async getUserByEmail(email: string){
        //----> Fetch the user with the given email.
        const user = await prisma.user.findUnique({where:{email}})

        //----> Check for null user.
        if(!user){
            return new CustomError("UnAuthorized", "Invalid credentials!", StatusCodes.UNAUTHORIZED);
        }

        //----> Send back result.
        return user;
    }

    private async getAuthorByEmail(email: string){
        //----> Fetch the author with the given email.
        const author = await prisma.author.findUnique({where:{email}})

        //----> Check for null author.
        if(!author){
            return new CustomError("Not found", "Author is not found in db!", StatusCodes.NOT_FOUND);
        }

        //----> Send back result.
        return author;
    }

    private fromSignupUserToAuthor = (request: SignupUser, userId: string) => {
        //----> Compose new Author.
        return  {
            name: request.name,
            email: request.email,
            phone: request.phone,
            image: request.image,
            address: request.address,
            gender: request.gender,
            dateOfBirth: new Date(request.dateOfBirth),
            age: new Date().getFullYear() - new Date(request.dateOfBirth).getFullYear(),
            userId: userId,
        }
    }

    private generateAccessAndRefreshTokensByUser = async (user: TokenJwt) => {
        //----> Revoke all valid tokens.
        await tokenModel.revokedTokensByUserId(user.id)

        //----> Generate access token and store it in a cookie.
        const accessToken = await this.generateToken(user.id, user.name, user.email, user.role, CookieParam.accessTokenExpireIn);
        await this.setCookie(CookieParam.accessTokenName, accessToken, CookieParam.accessTokenPath, CookieParam.accessTokenExpireIn);

        //----> Generate refresh token and store it in a cookie.
        const refreshToken = await this.generateToken(user.id, user.name, user.email, user.role, CookieParam.refreshTokenExpireIn);
        await this.setCookie(CookieParam.refreshTokenName, refreshToken, CookieParam.refreshTokenPath, CookieParam.refreshTokenExpireIn);

        //----> Set the cookie-session.
        const userResponse: UserResponse = {id: user.id, name: user.name, email: user.email, role: user.role, isLoggedIn: true, isAdmin: user.role === Role.Admin, accessToken}
        await this.setCookie(CookieParam.sessionTokenName, JSON.stringify(userResponse), CookieParam.sessionTokenPath, CookieParam.sessionTokenExpireIn)


        //----> Make token object and store it in token db.
        const tokenObject = this.makeNewToken(accessToken, refreshToken, user.id) as unknown as Token;
        await tokenModel.createToken(tokenObject as Token)

        //----> Send back access token.
        return userResponse;
    }

    private setCookie = async (cookieName: string, cookieValue: string, cookiePath: string, maxAge: number) => {
        //----> Initialize cookie.
        const cookie = await cookies();

        //----> set cookie.
        cookie.set(cookieName, cookieValue, {
            httpOnly: true,
            secure: false,
            path: cookiePath,
            maxAge
        })
    }

    private makeNewToken = (accessToken: string, refreshToken: string, userId: string) => {
        //----> Make new token.
        return {accessToken, refreshToken, userId, expired: false, revoked: false, tokenType: TokenType.Bearer};
    }

    ////----> Generate json web token function.
    private generateToken = async (id: string, name: string, email: string, role: Role, expiresIn: number)=>{
        return jwt.sign(
            {
                id,
                name,
                role,
                email
            },
            process.env.JWT_TOKEN_KEY!,
            {expiresIn}
        );
    }

    private deleteCookie = async (cookieName: string) => {
        const cookieStore = await cookies();
        cookieStore.delete(cookieName);
   }

   private deleteAllCookies = async () => {
        await this.deleteCookie(CookieParam.accessTokenName);
        await this.deleteCookie(CookieParam.refreshTokenName);
        await this.deleteCookie(CookieParam.sessionTokenName);

   }

}

export const authModel = new AuthModel();