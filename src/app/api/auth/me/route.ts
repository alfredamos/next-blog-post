import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {cookies} from "next/headers";
import {CookieParam} from "@/utils/cookieParam.util";
import {TokenJwt} from "@/utils/tokenJwt.util";
import {authModel} from "@/models/auth.model";

export async function GET() {
    console.log("In get current user")
    //----> Get the session token.
    const cookieStore = await cookies();
    const sessionTokenString = cookieStore.get(CookieParam.sessionTokenName)?.value as string;

    //----> Check for null session.
    if (!sessionTokenString) {
        return NextResponse.json({ error: "Could not get session token from session token!" }, { status: StatusCodes.UNAUTHORIZED });
    }

    //----> Get the session.
    const sessionToken = JSON.parse(sessionTokenString) as TokenJwt;
    const {email} = sessionToken;

    //----> Get current user in the db.
    const result  = await authModel.getCurrentUser(email);

    //----> Send back response.
    return NextResponse.json(result, {status: StatusCodes.OK});
}
