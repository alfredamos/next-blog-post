import {validateUserToken} from "@/utils/validateToken.util";
import {cookies} from "next/headers";
import {CookieParam} from "@/utils/cookieParam.util";
import {CustomError} from "@/utils/customError.util";
import {StatusCodes} from "http-status-codes";

export async function getSession() {
    //----> Get the access token from cookie.
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(CookieParam.sessionTokenName)?.value as string;
    console.log("get-session, sessionToken : ", sessionToken);

    //----> Validate session token and set it on a cookie.
    const session = validateUserToken(sessionToken);

    // //----> Check for null user.
    if (!session){
        console.log("session token not found");
        throw new CustomError("Unauthorized", "Invalid credentials", StatusCodes.UNAUTHORIZED);
    }

    //----> Move onto the next.

    return session;
}