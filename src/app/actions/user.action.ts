"use server"


import {userModel} from "@/models/user.model";

export async function deleteUserById(id:string){
    //----> Delete the user with the given id.
    return await userModel.deleteUserById(id);
}

export async function getUserById(id:string){
    //----> Fetch the user with the given id.
    return await userModel.getUserById(id);
}

export async function getAllUsers(){
    //----> Fetch all users from db.
    return await userModel.getAllUsers();
}