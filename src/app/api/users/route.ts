import {userModel} from "@/src/models/user.model";
import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";

export  async function GET() {
    //----> Fetch all users from db.
    const response = await userModel.getAllUsers();
    console.log("In the route of getAllUsers, response", response)
    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});
}
