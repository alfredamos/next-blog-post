import {NextRequest, NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {LoginUser, loginUserSchema} from "@/validations/auth.validation";
import {validateWithZodSchema} from "@/validations/zodSchema.validation";
import {authModel} from "@/models/auth.model";
import {CustomError} from "@/utils/customError.util";

export async function POST(request: NextRequest) {
    //----> Get the loginUser payload from request.
    const loginUser = await request.json() as LoginUser;

    //----> Check validation error.
    const result = validateWithZodSchema(loginUserSchema, loginUser)
    if (result instanceof NextResponse) {
        return NextResponse.json(result);
    }

    //----> LoginUser in the db.
    const response  = await authModel.loginUser(result.data);

    //----> Check for error.
    if (response instanceof CustomError) {
        return NextResponse.json(response);
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});
}
