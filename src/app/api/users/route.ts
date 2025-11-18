import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {userModel} from "@/models/user.model";
import {CustomError} from "@/utils/customError.util";

export  async function GET(query?: string) {
    //----> Fetch all users from db.
    const response = await userModel.getAllUsers(query);

    //----> Check for error.
    if (response instanceof CustomError) {
        return NextResponse.json(response);
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});
}
