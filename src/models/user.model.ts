import {StatusCodes} from "http-status-codes";
import {ownerCheckOrAdmin} from "@/utils/ownerCheckOrAdmin.util";
import {CustomError} from "@/utils/customError.util";
import prisma from "@/db/prisma.db";
import {ResponseMessageUtil} from "@/utils/responseMessage.util";
import {toUserDto} from "@/dto/toUser.dto";
import {adminUserUtil} from "@/utils/adminUser.util";

class UserModel {
   async deleteUserById(id: string) {
       //----> Fetch the user.
       const user = await this.getOneUser(id);
       if (!user) {
           return new CustomError("Not found", "User is not foud in db!", StatusCodes.NOT_FOUND);
       }

       //----> Check for ownership or admin.
       if (!await ownerCheckOrAdmin(id)){
           return new CustomError("Forbidden", "You don't have permission to view or perform any action on this page!", StatusCodes.FORBIDDEN)
       }

       //----> Delete the user with the given id.
       await prisma.user.delete({ where: { id: id } });

       //----> Send back response.
       return new ResponseMessageUtil("User has been deleted successfully!", "success", StatusCodes.OK)

   }

   async getUserById(id: string) {
       //----> Check for ownership or admin.
       if (!await ownerCheckOrAdmin(id)){
           return new CustomError("Forbidden", "You don't have permission to view or perform any action on this page!", StatusCodes.FORBIDDEN)
       }

       //----> Fetch the user.
       const user = await this.getOneUser(id);
       if (!user) {
           return new CustomError("Not found", "Author is not foud in db!", StatusCodes.NOT_FOUND);
       }
       return  toUserDto(user);

   }

   async getAllUsers() {
       //----> Must be an admin.
       if (!await adminUserUtil()){
           return new CustomError("Forbidden", "You don't have permission to view or perform any action on this page!", StatusCodes.FORBIDDEN)
       }

       //----> Fetch all users.
       return (await prisma.user.findMany({})).map(user => toUserDto(user));
   }

   private async getOneUser(id: string) {
       //----> Fetch the user from db.
       return prisma.user.findUnique({ where: { id } });
   }
}

export const userModel = new UserModel();