import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {authModel} from "@/models/auth.model";
import {CustomError} from "@/utils/customError.util";

export async function POST() {
    try {
        //----> LogoutUser in the db.
        const response = await authModel.logoutUser();

        //----> Check for error.
        if (response instanceof CustomError) {
            return NextResponse.json(response, {status: StatusCodes.UNAUTHORIZED});
        }

        //----> Send back response.
        return NextResponse.json(response, {status: StatusCodes.OK});
    }catch (err){
        const error = err as CustomError;
        return NextResponse.json(error, {status: error?.status });
    }
}
