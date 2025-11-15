import {NextRequest, NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {ChangeUserPassword, changeUserPasswordSchema} from "@/validations/auth.validation";
import {authModel} from "@/models/auth.model";
import {validateWithZodSchema} from "@/validations/zodSchema.validation";
import {CustomError} from "@/utils/customError.util";

export async function PATCH(request: NextRequest) {
    //----> Get the change-password payload from request.
    const changeUserPassword = await request.json() as ChangeUserPassword;

    //----> Check validation error.
    const result = validateWithZodSchema(changeUserPasswordSchema, changeUserPassword)
    if (result instanceof CustomError) {
        return NextResponse.json(result, {status: StatusCodes.BAD_REQUEST});
    }

    //----> Change password in the db.
    const response  = await authModel.changeUserPassword(result.data);

    //----> Check for error.
    if (response instanceof CustomError) {
        return NextResponse.json(response, {status: StatusCodes.UNAUTHORIZED});
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});
}
