"use server"

import {authModel} from "@/models/auth.model";
import {ChangeUserPassword, EditUserProfile, LoginUser, SignupUser} from "@/validations/auth.validation";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

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

export async function loginUser(formData: FormData){
    //----> Login user.
    const loginReq = Object.fromEntries(formData.entries());
    const req: LoginUser = {
        email: loginReq.email as string,
        password: loginReq.password as string,
    }
    console.log("In login action, req : ", req);
     const userRes = await authModel.loginUser(req);

     console.log("In login action, userRes : ",userRes);

    //----> Go to post.
    redirect("/")
}

export async function logoutUser(){
    //----> Logout user.
    console.log("In logout action, logout action");
    const response = await authModel.logoutUser();
    console.log("In logout action, response : ", response);
    redirect("/")
}

export async function refreshUserToken(refreshToken: string){
    //----> Refresh user token.
    return await authModel.refreshUserToken(refreshToken);
}

export async function signupUser(formData: FormData){
    //----> Extract form values.
    const signupReq = Object.fromEntries(formData.entries());

    const req: SignupUser = {
        email: signupReq.email as string,
        password: signupReq.password as string,
        confirmPassword: signupReq.confirmPassword as string,
        name: signupReq.name as string,
        phone: signupReq.phone as string,
        address: signupReq.address as string,
        image: signupReq.image as string,
        dateOfBirth: signupReq.dateOfBirth as string,
        gender: signupReq.genderas as  'Male' | 'Female',
    }
    console.log("In signupUser, req : ", req);

    //----> Refresh user token.
    const response = await authModel.signupUser(req);

    console.log("In signupUser, req : ", response);
    redirect("/")
}
