import {NextRequest, NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {LoginUser, loginUserSchema} from "@/validations/auth.validation";
import {validateWithZodSchema} from "@/validations/zodSchema.validation";
import {authModel} from "@/models/auth.model";
import {CustomError} from "@/utils/customError.util";

export async function POST(request: NextRequest) {
    //----> Get the loginUser payload from request.
    const loginUser = await request.json() as LoginUser;

    try {
        //----> Check validation error.
        const result = validateWithZodSchema(loginUserSchema, loginUser)

        //----> LoginUser in the db.
        const response = await authModel.loginUser(result.data);

        //----> Send back response.
        return NextResponse.json(response, {status: StatusCodes.OK});
    }catch (err){
        const error = err as CustomError;
        return NextResponse.json(error, {status: error?.status });
    }
}
