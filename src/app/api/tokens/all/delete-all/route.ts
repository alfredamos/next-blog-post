import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {tokenModel} from "@/models/token.model";
import {CustomError} from "@/utils/customError.util";

export async function DELETE() {
    //----> Delete all invalid tokens associated with the given id.
    const result  = await tokenModel.deleteAllInvalidTokens();

    //----> Check for error.
    if (result instanceof CustomError) {
        return NextResponse.json(result);
    }

    //----> Send back response.
    return NextResponse.json(result, {status: StatusCodes.OK});
}
