"use server"

import {userModel} from "@/models/user.model";

export async function deleteUserById(id:string){
    try {
        //----> Delete the user with the given id.
        const response = await userModel.deleteUserById(id);

        return {
            message: response,
            error: null
        }
    }catch(error){
        return {
            message: null,
            error
        }
    }
}

export async function getUserById(id:string){
    try {
        //----> Fetch the user with the given id.
        const response = await userModel.getUserById(id);

        return {
            user: response,
            error: null
        }
    }catch(error){
        return {
            user: null,
            error
        }
    }
}

export async function getAllUsers(query?:string){
    try {
        //----> Fetch all users from db.
        const response = await userModel.getAllUsers(query);

        return {
            users: response,
            error: null
        }
    }catch(error){
        return {
            users: null,
            error
        }
    }
}