import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {cookies} from "next/headers";
import {CookieParam} from "@/utils/cookieParam.util";
import {TokenJwt} from "@/utils/tokenJwt.util";
import {authModel} from "@/models/auth.model";
import {CustomError} from "@/utils/customError.util";

export async function GET() {
    try {
        //----> Get the session token.
        const cookieStore = await cookies();
        const sessionTokenString = cookieStore.get(CookieParam.sessionTokenName)?.value as string;

        //----> Get the session.
        const sessionToken = JSON.parse(sessionTokenString) as TokenJwt;
        const {email} = sessionToken;

        //----> Get current user in the db.
        const response = await authModel.getCurrentUser(email);

        //----> Send back response.
        return NextResponse.json(response, {status: StatusCodes.OK});
    }catch (err){
        const error = err as CustomError;
        return NextResponse.json(error, {status: error?.status });
    }
}
