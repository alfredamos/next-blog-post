import {NextRequest, NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {LoginUser} from "@/validations/auth.validation";
import {authModel} from "@/models/auth.model";

export async function POST(request: NextRequest) {
    console.log("In loginUser")
    //----> Get the loginUser payload from request.
    const loginUser = await request.json() as LoginUser;
    console.log(loginUser);

    //----> LoginUser in the db.
    const result  = await authModel.loginUser(loginUser);

    //----> Send back response.
    return NextResponse.json(result, {status: StatusCodes.OK});
}
