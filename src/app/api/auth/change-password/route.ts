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
    try {
        const result = validateWithZodSchema(changeUserPasswordSchema, changeUserPassword)

        //----> Change password in the db.
        const response = await authModel.changeUserPassword(result.data);

        //----> Send back response.
        return NextResponse.json(response, {status: StatusCodes.OK});
    }catch(err) {
        const error = err as CustomError;
        return NextResponse.json(error, {status: error?.status });
    }
}
