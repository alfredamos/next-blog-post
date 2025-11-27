import {NextRequest, NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {editProfileUserSchema, EditUserProfile} from "@/validations/auth.validation";
import {authModel} from "@/models/auth.model";
import {validateWithZodSchema} from "@/validations/zodSchema.validation";
import {CustomError} from "@/utils/customError.util";

export async function PATCH(request: NextRequest) {
    //----> Get the edit-user-profile payload from request.
    const editUserProfile = await request.json() as EditUserProfile;

    try {
        //----> Check validation error.
        const result = validateWithZodSchema(editProfileUserSchema, editUserProfile)

        //----> Edit Profile user in the db.
        const response = await authModel.editUserProfile(result.data);

        //----> Send back response.
        return NextResponse.json(response, {status: StatusCodes.OK});
    }catch(err) {
        const error = err as CustomError;
        return NextResponse.json(error, {status: error?.status });
    }
}
