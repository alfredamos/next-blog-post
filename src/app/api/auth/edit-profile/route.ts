import {NextRequest, NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {EditUserProfile} from "@/validations/auth.validation";
import {authModel} from "@/models/auth.model";

export async function PATCH(request: NextRequest) {
    console.log("In edit-user-profile")
    //----> Get the edit-user-profile payload from request.
    const editUserProfile = await request.json() as EditUserProfile;
    console.log(editUserProfile);

    //----> Edit Profile user in the db.
    const result  = await authModel.editUserProfile(editUserProfile);

    //----> Send back response.
    return NextResponse.json(result, {status: StatusCodes.OK});
}
