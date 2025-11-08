import {NextRequest, NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {tokenModel} from "@/models/token.model";

export async function DELETE(_request: NextRequest,  { params }: { params: Promise<{ userId: string }> } ) {
    //----> Delete all tokens associated with the given id.
    const {userId} = await params;
    const result  = await tokenModel.deleteInvalidTokensByUserId(userId);

    //----> Send back response.
    return NextResponse.json(result, {status: StatusCodes.OK});
}
