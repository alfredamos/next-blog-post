"use server"

import {authModel} from "@/models/auth.model";
import {ChangeUserPassword, EditUserProfile, LoginUser, SignupUser} from "@/validations/auth.validation";
import {redirect} from "next/navigation";
import {getLoggedInUserInfo} from "@/lib/getLoggedInUser";
import {CustomError} from "@/utils/customError.util";

export async function changeUserPassword(formData: FormData) {
    //----> Extract the parameters from formData.
    const cupReq = Object.fromEntries(formData.entries()) as ChangeUserPassword;
    const req : ChangeUserPassword = {
        email: cupReq.email,
        password: cupReq.password,
        confirmPassword: cupReq.confirmPassword,
        newPassword: cupReq.password,
    }
    //----> Change the user password in the db.
    await authModel.changeUserPassword(req);

    return redirect("/");
}

export async function editUserProfile(formData: FormData){
    //----> Extract form values.
    const editProfileOfUser = Object.fromEntries(formData.entries());

    console.log("editProfileOfUser, formDataValue", editProfileOfUser);

    const req: EditUserProfile = {
        email: editProfileOfUser.email as string,
        password: editProfileOfUser.password as string,
        name: editProfileOfUser.name as string,
        phone: editProfileOfUser.phone as string,
        address: editProfileOfUser.address as string,
        image: editProfileOfUser.image as string,
        dateOfBirth: editProfileOfUser.dateOfBirth as string,
        gender: editProfileOfUser.gender as  'Male' | 'Female',
    }
    console.log("In editUserProfile, req : ", req);

    //----> Refresh user token.
    const response = await authModel.editUserProfile(req);

    if (!response?.status) {
        redirect("/login");
    }

    console.log("In editUserProfile, req : ", response);
    return redirect("/");
}


export async function getCurrentUser(){
    const userResponse = await getLoggedInUserInfo()
    //----> Get current user from db.
    const authResponse = await authModel.getCurrentUser(userResponse.email);

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

     //----> Send back user response.
     return userRes;
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
        gender: signupReq.gender as  'Male' | 'Female',
    }
    console.log("In signupUser, req : ", req);

    //----> Refresh user token.
    const response = await authModel.signupUser(req);

    console.log("In signupUser, req : ", response);
    redirect("/")
}
