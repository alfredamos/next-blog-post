import {cookies} from "next/headers";
import {StatusCodes} from "http-status-codes";
import {NextResponse} from "next/server";
import {CookieParam} from "@/utils/cookieParam.util";

export async function getSessionCookie(){
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(CookieParam.sessionTokenName)?.value as string;

    //----> Check for empty token
    if (!sessionToken) {
        NextResponse.json({message: "Invalid session token"}, {status: StatusCodes.UNAUTHORIZED});
    }

    //----> Send back result.
    return sessionToken;
}