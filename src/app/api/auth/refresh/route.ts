import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {cookies} from "next/headers";
import {CookieParam} from "@/utils/cookieParam.util";
import {authModel} from "@/models/auth.model";
import {CustomError} from "@/utils/customError.util";

export async function POST() {
    try {
        //----> Get the refresh token.
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get(CookieParam.refreshTokenName)?.value as string;

        //----> RefreshUser in the db.
        const response = await authModel.refreshUserToken(refreshToken);

        //----> Send back response.
        return NextResponse.json(response, {status: StatusCodes.OK});
    }catch(err){
        const error = err as CustomError;
        return NextResponse.json(error, {status: error?.status });
    }
}
