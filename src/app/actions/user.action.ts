"use server"

import {userModel} from "@/models/user.model";
import {CustomError} from "@/utils/customError.util";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

export async function deleteUserById(id:string){
    //----> Delete the user with the given id.
    const response = await userModel.deleteUserById(id);

    //----> Check for error.
    if (response instanceof CustomError) {
        throw new CustomError(response.name, response.message, response.status);
    }

    //----> Send back response.
    revalidatePath("/users")
    redirect("/users")

}

export async function getUserById(id:string){
    //----> Fetch the user with the given id.
    const response = await userModel.getUserById(id);

    //----> Check for error.
    if (response instanceof CustomError) {
        throw new CustomError(response.name, response.message, response.status);
    }

    //----> Send back response.
    return response;
}

export async function getAllUsers(query?:string){
    //----> Fetch all users from db.
    const response = await userModel.getAllUsers(query);

    //----> Check for error.
    if (response instanceof CustomError) {
        throw new CustomError(response.name, response.message, response.status);
    }

    //----> Send back response.
    return response;
}