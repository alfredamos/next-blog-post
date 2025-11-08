"use server"

import {NextRequest, NextResponse} from "next/server";
import {getAccessCookie} from "@/lib/getAccesscookie.lib";
import {validateUserToken} from "@/utils/validateToken.util";
import {resourceIsNullOrUndefined} from "@/utils/checkForNullResource.util";
import {checkForAdminRole} from "@/lib/checkForAdminRole.lib";
import {TokenJwt} from "@/utils/tokenJwt.util";

export async function cookieAdminMiddleware(req: NextRequest){
    //----> Get the access token from cookie.
    const accessToken = await getAccessCookie();

    //----> Validate access token and set it on a cookie.
    const user = validateUserToken(accessToken);

    //----> Check for null user.
    resourceIsNullOrUndefined("user");

    //----> Check for admin privilege.
    checkForAdminRole(user as TokenJwt);

    //----> Move onto the next proxy
    return NextResponse.next();
}