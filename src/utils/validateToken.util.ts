import * as jwt from "jsonwebtoken";
import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {TokenJwt} from "@/utils/tokenJwt.util";

export function validateUserToken(token: string){
    //----> Check for empty token.
    if(!token) {
        return NextResponse.json({message: "Invalid token"}, {status: StatusCodes.UNAUTHORIZED});
    }

    //----> Verify the jwt-token
    try {
        return jwt?.verify(token, process.env.JWT_TOKEN_KEY!) as TokenJwt;
    }catch(_error: unknown) {
        return NextResponse.json({message: "Invalid credentials!"}, {status: StatusCodes.UNAUTHORIZED});
    }

}