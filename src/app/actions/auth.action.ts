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

export async function changeUserPassword(formData: FormData) {
    //----> Extract the parameters from formData.
    const cupReq = Object.fromEntries(formData.entries()) as ChangeUserPassword;
    const req : ChangeUserPassword = {
        email: cupReq.email,
        password: cupReq.password,
        confirmPassword: cupReq.confirmPassword,
        newPassword: cupReq.password,
    }

    try{
        validateWithZodSchema(changeUserPasswordSchema, req)

        //----> Change the user password in the db.
        await authModel.changeUserPassword(req);
        return redirect("/");
    }catch(err){
        return err
    }
    //----> Check validation error.



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

    try {
        //----> Check validation error.
        validateWithZodSchema(editProfileUserSchema, req)

        //----> Refresh user token.
        await authModel.editUserProfile(req);

        return redirect("/");
    }catch(err){
        return err
    }
}


export async function getCurrentUser(){
    const userResponse = await getLoggedInUserInfo()
    //----> Get current user from db and send back response.
    try{
        const response = await authModel.getCurrentUser(userResponse.email);

        //----> Send back response
        return {
            user: response,
            error: null,
        };
    }catch(error){
        return {
            user: null,
            error: error
        }
    }




}

export async function loginUser(formData: FormData){
    //----> Login user.
    const loginReq = Object.fromEntries(formData.entries());
    const req: LoginUser = {
        email: loginReq.email as string,
        password: loginReq.password as string,
    }
    console.log("At point 1, login-user, loginReq", loginReq);

    try {
        //----> Check validation error.
        validateWithZodSchema(loginUserSchema, req)

        console.log("At point 2, login-user, loginReq", loginReq);


        //----> Login user.
        const userRes = await authModel.loginUser(req);
        console.log("At point 3, login-user, loginReq", userRes);

        //----> Send back user response.
        return {
            user: userRes,
            error: null,
        };
    }catch(error){
        return {
            user: null,
            error: error
        }
    }
}

export async function logoutUser(){
    //----> Logout user.
    await authModel.logoutUser();

    redirect("/login")
}

export async function refreshUserTokenAction(){
    console.log("clicked! clicked!! clicked!!!")
    //----> Refresh user token.
    try{
        const cookieStore = await cookies();
        const refreshToken = cookieStore?.get(CookieParam.refreshTokenName)?.value as string;


        const response = await authModel.refreshUserToken(refreshToken);

        //----> Send back user response.
        return {
            session: response,
        };
    }catch(error){
        console.error(error);
        return {

            session: null,
        }
    }

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

    try {
        //----> Check validation error.
        validateWithZodSchema(signupUserSchema, req)

        //----> Refresh user token.
        await authModel.signupUser(req);
        redirect("/")
    }catch(error){
        return error
    }
}
