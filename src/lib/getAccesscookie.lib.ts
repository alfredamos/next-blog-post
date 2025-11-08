import {StatusCodes} from "http-status-codes";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";
import {CookieParam} from "@/utils/cookieParam.util";

export async function getAccessCookie(){
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(CookieParam.accessTokenName)?.value as string;
    console.log("getAccessCookie, accessToken : ", accessToken);
    //----> Check for empty token
    if (!accessToken) {
        NextResponse.json({message: "Access denied"}, {status: StatusCodes.UNAUTHORIZED});
    }

    //----> Send back result.
    return accessToken;
}