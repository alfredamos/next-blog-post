import {StatusCodes} from "http-status-codes";
import {getSessionCookie} from "@/lib/getSessionCookie";
import {CustomError} from "@/utils/customError.util";

export async function getLoggedInUserInfo(){
    //----> Get session token.
    const session = await getSessionCookie();

    if (!session) {
        throw new CustomError("UnAuthorized", "No session cookie found!",  StatusCodes.UNAUTHORIZED);
    }

    //----> Parse user info.
    return JSON.parse(session) as UserResponse;

}