import {NextRequest, NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {SignupUser} from "@/validations/auth.validation";
import {authModel} from "@/models/auth.model";

export async function POST(request: NextRequest) {
    console.log("In signupUser")
    //----> Get the signupUser payload from request.
    const signupUser = await request.json() as SignupUser;
    console.log(signupUser);

    //----> SignupUser in the db.
    const result  = await authModel.signupUser(signupUser);

    //----> Send back response.
    return NextResponse.json(result, {status: StatusCodes.OK});
}
