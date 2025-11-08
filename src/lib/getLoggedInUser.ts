import {StatusCodes} from "http-status-codes";
import {getSessionCookie} from "@/lib/getSessionCookie";
import {CustomError} from "@/utils/customError.util";
import {TokenJwt} from "@/utils/tokenJwt.util";

export async function getLoggedInUserInfo(){
    //----> Get session token.
    const session = await getSessionCookie();

    if (!session) {
        throw new CustomError("UnAuthorized", "No session cookie found!",  StatusCodes.UNAUTHORIZED);
    }

    //----> Parse user info.
    return JSON.parse(session) as TokenJwt;

}