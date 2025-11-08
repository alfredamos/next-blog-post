import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {TokenJwt} from "@/utils/tokenJwt.util";

export function checkForNullUser(user: TokenJwt) {
    //----> Check for null user.
    if (!user) {
        return NextResponse.json({ message: "Invalid credentials!" }, { status: StatusCodes.UNAUTHORIZED });
    }
}