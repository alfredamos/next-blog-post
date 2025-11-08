import {NextRequest, NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {ChangeUserPassword} from "@/validations/auth.validation";
import {authModel} from "@/models/auth.model";

export async function PATCH(request: NextRequest) {
    console.log("In change-password")
    //----> Get the change-password payload from request.
    const changePassword = await request.json() as ChangeUserPassword;
    console.log(changePassword);

    //----> Change password in the db.
    const result  = await authModel.changeUserPassword(changePassword);

    //----> Send back response.
    return NextResponse.json(result, {status: StatusCodes.OK});
}
