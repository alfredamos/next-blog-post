import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {userModel} from "@/models/user.model";
import {CustomError} from "@/utils/customError.util";

export async function GET(_req:Request, {params}:{params:Promise<{userId: string}>}) {
    //----> Get the user id from params.
    const {userId} = await params;

    try {
        //----> Fetch the user with the given userId from db.
        const user = await userModel.getUserById(userId);

        //----> Send back response.
        return NextResponse.json(user, {status: StatusCodes.OK});
    }catch(err){
        const error = err as CustomError;
        return NextResponse.json(error, {status: error?.status });
    }
}

export async function DELETE(_req:Request, {params}:{params:Promise<{userId: string}>}) {
    //----> Get the user id from params.
    const {userId} = await params;

    try {
        //----> Delete the user with the given userId from db.
        const user = await userModel.deleteUserById(userId);

        //----> Send back response.
        return NextResponse.json(user, {status: StatusCodes.OK});
    }catch(err){
        const error = err as CustomError;
        return NextResponse.json(error, {status: error?.status });
    }
}