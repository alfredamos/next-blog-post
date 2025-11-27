import {NextRequest, NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {tokenModel} from "@/models/token.model";
import {CustomError} from "@/utils/customError.util";

export async function DELETE(_request: NextRequest,  { params }: { params: Promise<{ userId: string }> } ) {
    //----> Delete all tokens associated with the given id.
    const {userId} = await params;

    try {
        const result = await tokenModel.deleteInvalidTokensByUserId(userId);

        //----> Send back response.
        return NextResponse.json(result, {status: StatusCodes.OK});
    }catch(err){
        const error = err as CustomError;
        return NextResponse.json(error, {status: error?.status });
    }
}
