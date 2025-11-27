import {NextRequest, NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {userModel} from "@/models/user.model";
import {CustomError} from "@/utils/customError.util";

export  async function GET(request: NextRequest) {
    try {
        //----> Get the search query.
        const searchParams = request.nextUrl.searchParams;
        const query = searchParams.get('query');

        //----> Fetch all users from db.
        const response = await userModel.getAllUsers(query as string);

        //----> Send back response.
        return NextResponse.json(response, {status: StatusCodes.OK});
    }catch(err) {
        const error = err as CustomError;
        return NextResponse.json(error, {status: error?.status });
    }
}
