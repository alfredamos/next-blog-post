import {NextRequest, NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {editProfileUserSchema, EditUserProfile} from "@/validations/auth.validation";
import {authModel} from "@/models/auth.model";
import {validateWithZodSchema} from "@/validations/zodSchema.validation";
import {CustomError} from "@/utils/customError.util";

export async function PATCH(request: NextRequest) {
    //----> Get the edit-user-profile payload from request.
    const editUserProfile = await request.json() as EditUserProfile;

    //----> Check validation error.
    const result = validateWithZodSchema(editProfileUserSchema, editUserProfile)
    if (result instanceof NextResponse) {
        return NextResponse.json(result);
    }

    //----> Edit Profile user in the db.
    const response  = await authModel.editUserProfile(result.data);
    //----> Check for error.
    if (response instanceof CustomError) {
        return NextResponse.json(response);
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});
}
