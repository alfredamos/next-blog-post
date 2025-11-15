"use server"

import {authModel} from "@/models/auth.model";
import {
    ChangeUserPassword,
    changeUserPasswordSchema, editProfileUserSchema,
    EditUserProfile,
    LoginUser, loginUserSchema,
    SignupUser, signupUserSchema
} from "@/validations/auth.validation";
import {redirect} from "next/navigation";
import {getLoggedInUserInfo} from "@/lib/getLoggedInUser";
import {cookies} from "next/headers";
import {CookieParam} from "@/utils/cookieParam.util";
import {validateWithZodSchema} from "@/validations/zodSchema.validation";
import {NextResponse} from "next/server";
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

    //----> Check validation error.
    const result = validateWithZodSchema(changeUserPasswordSchema, req)
    if (result instanceof NextResponse) {
        return NextResponse.json(result);
    }

    //----> Change the user password in the db.
    const response = await authModel.changeUserPassword(req);

    if (response instanceof CustomError) {
        return redirect("/login");
    }

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

    //----> Check validation error.
    const result = validateWithZodSchema(editProfileUserSchema, req)
    if (result instanceof NextResponse) {
        return NextResponse.json(result);
    }

    //----> Refresh user token.
    const response = await authModel.editUserProfile(req);

    if (response instanceof CustomError) {
        redirect("/login");
    }

    return redirect("/");
}


export async function getCurrentUser(){
    const userResponse = await getLoggedInUserInfo()
    //----> Get current user from db and send back response.
    const response = await authModel.getCurrentUser(userResponse.email);

    //----> Check for error.
    if (response instanceof CustomError) {
        return NextResponse.json(response);
    }

    //----> Send back response
    return response;

}

export async function loginUser(formData: FormData){
    //----> Login user.
    const loginReq = Object.fromEntries(formData.entries());
    const req: LoginUser = {
        email: loginReq.email as string,
        password: loginReq.password as string,
    }

    //----> Check validation error.
    const result = validateWithZodSchema(loginUserSchema, req)
    if (result instanceof NextResponse) {
        return NextResponse.json(result);
    }

     const userRes = await authModel.loginUser(req);

    //----> Check for error.
     if (userRes instanceof CustomError) {
         return NextResponse.json(userRes);
     }

     //----> Send back user response.
     return userRes;
}

export async function logoutUser(){
    //----> Logout user.
    const response = await authModel.logoutUser();

    //----> Check for error.
    if (response instanceof CustomError) {
        return NextResponse.json(response);
    }

    redirect("/")
}

export async function refreshUserTokenAction(){
    //----> Refresh user token.
    const cookieStore = await cookies();
    const refreshToken = cookieStore?.get(CookieParam.refreshTokenName)?.value as string;

    const response = await authModel.refreshUserToken(refreshToken);

    //----> Check for error.
    if (response instanceof CustomError) {
        return NextResponse.json(response);
    }

    redirect("/")
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

    //----> Check validation error.
    const result = validateWithZodSchema(signupUserSchema, req)
    if (result instanceof NextResponse) {
        return NextResponse.json(result);
    }

    //----> Refresh user token.
    const response = await authModel.signupUser(req);

    //----> Check for error.
    if (response instanceof CustomError) {
        return NextResponse.json(response);
    }

    redirect("/")
}
