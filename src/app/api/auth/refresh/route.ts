import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {cookies} from "next/headers";
import {CookieParam} from "@/utils/cookieParam.util";
import {authModel} from "@/models/auth.model";
import {CustomError} from "@/utils/customError.util";

export async function POST() {
    //----> Get the refresh token.
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(CookieParam.refreshTokenName)?.value as string;

    //----> RefreshUser in the db.
    const response  = await authModel.refreshUserToken(refreshToken);

    //----> Check for error.
    if (response instanceof CustomError) {
        return NextResponse.json(response);
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});
}
