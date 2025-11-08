import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {authModel} from "@/models/auth.model";

export async function POST() {
    console.log("In logoutUser")

    //----> LogoutUser in the db.
    const result  = await authModel.logoutUser();

    //----> Send back response.
    return NextResponse.json(result, {status: StatusCodes.OK});
}
