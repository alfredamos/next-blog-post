import {Role} from "@prisma/client";
import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {TokenJwt} from "@/utils/tokenJwt.util";

export function checkForAdminRole(user: TokenJwt) {
    //----> Check for admin privilege.
    if (user.role !== Role.Admin) {
        return NextResponse.json({ message: "You are not permitted to view this page!" }, {status: StatusCodes.FORBIDDEN});
    }
}