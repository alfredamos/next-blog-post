import {userModel} from "@/src/models/user.model";
import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";

export async function GET(_req:Request, {params}:{params:Promise<{userId: string}>}) {
    //----> Get the user id from params.
    const {userId} = await params;

    //----> Fetch the user with the given userId from db.
    const user = await userModel.getUserById(userId);

    //----> Send back response.
    return NextResponse.json(user, {status: StatusCodes.OK});
}

export async function DELETE(_req:Request, {params}:{params:Promise<{userId: string}>}) {
    //----> Get the user id from params.
    const {userId} = await params;

    //----> Delete the user with the given userId from db.
    const user = await userModel.deleteUserById(userId);

    //----> Send back response.
    return NextResponse.json(user, {status: StatusCodes.OK});
}