import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {cookies} from "next/headers";
import {CookieParam} from "@/utils/cookieParam.util";
import {TokenJwt} from "@/utils/tokenJwt.util";
import {authModel} from "@/models/auth.model";
import {CustomError} from "@/utils/customError.util";

export async function GET() {
    //----> Get the session token.
    const cookieStore = await cookies();
    const sessionTokenString = cookieStore.get(CookieParam.sessionTokenName)?.value as string;

    //----> Check for null session.
    if (!sessionTokenString) {
        return NextResponse.json({ error: "Could not detail session token from session token!" }, { status: StatusCodes.UNAUTHORIZED });
    }

    //----> Get the session.
    const sessionToken = JSON.parse(sessionTokenString) as TokenJwt;
    const {email} = sessionToken;

    //----> Get current user in the db.
    const response  = await authModel.getCurrentUser(email);

    //----> Check for error.
    if (response instanceof CustomError) {
        return NextResponse.json(response);
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});
}
