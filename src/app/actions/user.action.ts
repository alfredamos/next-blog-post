"use server"


import {userModel} from "@/models/user.model";
import {NextResponse} from "next/server";
import {CustomError} from "@/utils/customError.util";
import {redirect} from "next/navigation";
import {StatusCodes} from "http-status-codes";

export async function deleteUserById(id:string){
    //----> Delete the user with the given id.
    const response = await userModel.deleteUserById(id);

    //----> Check for error.
    if (response instanceof CustomError) {
        return NextResponse.json(response, {status: StatusCodes.INTERNAL_SERVER_ERROR});
    }

    //----> Send back response.
    redirect("/users")

}

export async function getUserById(id:string){
    //----> Fetch the user with the given id.
    const response = await userModel.getUserById(id);

    //----> Check for error.
    if (response instanceof CustomError) {
        return NextResponse.json(response, {status: StatusCodes.INTERNAL_SERVER_ERROR});
    }

    //----> Send back response.
    redirect("/users");
}

export async function getAllUsers(){
    //----> Fetch all users from db.
    const response = await userModel.getAllUsers();

    //----> Check for error.
    if (response instanceof CustomError) {
        return NextResponse.json(response, {status: StatusCodes.INTERNAL_SERVER_ERROR});
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});
}