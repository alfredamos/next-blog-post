import {NextRequest, NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {cookies} from "next/headers";
import {CookieParam} from "@/utils/cookieParam.util";
import {authModel} from "@/models/auth.model";

export async function POST(_request: NextRequest) {
    console.log("In refresh-user")
    //----> Get the refresh token.
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(CookieParam.refreshTokenName)?.value as string;


    //----> RefreshUser in the db.
    const result  = await authModel.refreshUserToken(refreshToken);

    //----> Send back response.
    return NextResponse.json(result, {status: StatusCodes.OK});
}
