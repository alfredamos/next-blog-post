import {NextRequest, NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {tokenModel} from "@/models/token.model";
import {CustomError} from "@/utils/customError.util";

export async function DELETE(_request: NextRequest,  { params }: { params: Promise<{ userId: string }> } ) {
    //----> Delete all tokens associated with the given id.
    const {userId} = await params;
    const result  = await tokenModel.deleteInvalidTokensByUserId(userId);

    //----> Check for error.
    if (result instanceof CustomError) {
        return NextResponse.json(result);
    }

    //----> Send back response.
    return NextResponse.json(result, {status: StatusCodes.OK});
}
