import {NextRequest, NextResponse} from "next/server";
import {isPublicRoute} from "@/utils/publicRoute.util";
import {getAccessCookie} from "@/lib/getAccesscookie.lib";
import {validateUserToken} from "@/utils/validateToken.util";
import {resourceIsNullOrUndefined} from "@/utils/checkForNullResource.util";
import {redirect} from "next/navigation";

export async function cookieAuthenticationMiddleware(req: NextRequest){
    //----> Public routes are not included in must authenticate.
    console.log("cookieAuthenticationMiddleware, path : ", req?.nextUrl?.pathname);
    console.log("cookieAuthenticationMiddleware, method : ", req?.method);
    if (isPublicRoute(req?.nextUrl?.pathname)) {
        return NextResponse.next();
    }

    //----> Get the access token from cookie.
    const accessToken = await getAccessCookie();
    console.log("cookieAuthenticationMiddleware, accessToken : ", accessToken);

    //----> Validate access token and set it on a cookie.
    const user = validateUserToken(accessToken);

    //----> Check for null user.
    if (!user) return resourceIsNullOrUndefined("user")

    //----> Move onto the next proxy
    return NextResponse.next();
}