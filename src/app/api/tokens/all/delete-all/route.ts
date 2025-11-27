import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {tokenModel} from "@/models/token.model";
import {CustomError} from "@/utils/customError.util";

export async function DELETE() {
    try {
        //----> Delete all invalid tokens associated with the given id.
        const result = await tokenModel.deleteAllInvalidTokens();

        //----> Send back response.
        return NextResponse.json(result, {status: StatusCodes.OK});
    }catch(err) {
        const error = err as CustomError;
        return NextResponse.json(error, {status: error?.status });
    }
}
