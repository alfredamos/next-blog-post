import {NextRequest, NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {SignupUser, signupUserSchema} from "@/validations/auth.validation";
import {authModel} from "@/models/auth.model";
import {validateWithZodSchema} from "@/validations/zodSchema.validation";
import {CustomError} from "@/utils/customError.util";

export async function POST(request: NextRequest) {
    //----> Get the signupUser payload from request.
    const signupUser = await request.json() as SignupUser;

    try {
        //----> Check validation error.
        const result = validateWithZodSchema(signupUserSchema, signupUser)

        //----> SignupUser in the db.
        const response = await authModel.signupUser(result.data);

        //----> Send back response.
        return NextResponse.json(response, {status: StatusCodes.OK});
    }catch (err) {
        const error = err as CustomError;
        return NextResponse.json(error, {status: error?.status });
    }
}
