"use server"

import {authModel} from "@/models/auth.model";
import {ChangeUserPassword, EditUserProfile, LoginUser, SignupUser} from "@/validations/auth.validation";

export async function changeUserPassword(req: ChangeUserPassword){
    //----> Change the user password in the db.
    return await authModel.changeUserPassword(req);
}

export async function editUserPassword(req: EditUserProfile){
    //----> Edit user profile in the db.
    return await authModel.editUserProfile(req);
}

export async function getCurrentUser(email: string){
    //----> Get current user from db.
    const authResponse = await authModel.getCurrentUser(email);

    //----> Send back response.
    return authResponse;
}

export async function loginUser(req: LoginUser){
    //----> Login user.
    return await authModel.loginUser(req);
}

export async function logoutUser(){
    //----> Logout user.
    return await authModel.logoutUser();
}

export async function refreshUserToken(refreshToken: string){
    //----> Refresh user token.
    return await authModel.refreshUserToken(refreshToken);
}

export async function signupUser(req: SignupUser){
    //----> Refresh user token.
    return await authModel.signupUser(req);
}
