"use server"

import {NextResponse} from "next/server";
import {getAccessCookie} from "@/lib/getAccesscookie.lib";
import {validateUserToken} from "@/utils/validateToken.util";
import {CustomError} from "@/utils/customError.util";
import {StatusCodes} from "http-status-codes";

export async function cookieAdminMiddleware(){
    //----> Get the access token from cookie.
    const accessToken = await getAccessCookie();

    //----> Validate access token and set it on a cookie.
    const user = validateUserToken(accessToken);

    //----> Check for non admin.
    if (!user?.isAdmin) {
        throw new CustomError("Forbidden", "You are not permitted to perform this action or view this page!", StatusCodes.FORBIDDEN);
    }

    //----> Move onto the next proxy
    return NextResponse.next();
}