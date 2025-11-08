import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {tokenModel} from "@/models/token.model";

export async function DELETE() {
    console.log("In delete-token-by-user-id");

    //----> Delete all invalid tokens associated with the given id.
    const result  = await tokenModel.deleteAllInvalidTokens();

    //----> Send back response.
    return NextResponse.json(result, {status: StatusCodes.OK});
}
