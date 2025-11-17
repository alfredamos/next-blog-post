import {validateUserToken} from "@/utils/validateToken.util";
import {CustomError} from "@/utils/customError.util";
import {StatusCodes} from "http-status-codes";
import {getAccessCookie} from "@/lib/getAccesscookie.lib";

export async function validateCredential(){
    //----> Get the access token from cookie.
    const accessToken = await getAccessCookie();

    //----> Validate access token and set it on a cookie.
    const user = validateUserToken(accessToken);

    //----> Check for null user.
    if (!user){
        throw new CustomError("Unauthorized", "Invalid credentials", StatusCodes.UNAUTHORIZED);
    }

    //----> Move onto the next.
    return user;
}