import {NextRequest, NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {SignupUser, signupUserSchema} from "@/validations/auth.validation";
import {authModel} from "@/models/auth.model";
import {validateWithZodSchema} from "@/validations/zodSchema.validation";
import {CustomError} from "@/utils/customError.util";

export async function POST(request: NextRequest) {
    //----> Get the signupUser payload from request.
    const signupUser = await request.json() as SignupUser;
    console.log("In signupUser", signupUser);
    //----> Check validation error.
    const result = validateWithZodSchema(signupUserSchema, signupUser)

    if (result instanceof CustomError) {
        return NextResponse.json(result);
    }

    console.log("In signupUser", result.data);

    //----> SignupUser in the db.
    const response  = await authModel.signupUser(result.data);

    //----> Check for error.
    if (response instanceof CustomError) {
        return NextResponse.json(response, {status: StatusCodes.BAD_REQUEST});
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});
}
