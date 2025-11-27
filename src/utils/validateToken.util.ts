import * as jwt from "jsonwebtoken";
import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {TokenJwt} from "@/utils/tokenJwt.util";
import {redirect} from "next/navigation";
import {CustomError} from "@/utils/customError.util";
import {Role} from "@prisma/client";

export function validateUserToken(token: string): Session{
    //----> Verify the jwt-token
    try {
        const tokenJwt = jwt?.verify(token, process.env.JWT_TOKEN_KEY!) as TokenJwt;
        return getUserCredential(tokenJwt, token);
    }catch(_error: unknown) {
        return  {...USER_NOT_LOGIN, accessToken: token};
    }

}

function getUserCredential(tokenJwt: TokenJwt, token: string){
    const userResponse : Session = {
        id: tokenJwt.id,
        name: tokenJwt.name,
        email: tokenJwt.email,
        role: tokenJwt.role,
        accessToken: token,
        isLoggedIn: true,
        isAdmin: tokenJwt.role === Role.Admin,
    }

    return userResponse;

}

const USER_NOT_LOGIN : Session = {
    id: "",
    name: "",
    email: "",
    role: Role.User,
    accessToken: "",
    isLoggedIn: false,
    isAdmin: false,
}