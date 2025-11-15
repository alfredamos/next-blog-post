import { ZodType as ZodSchema } from "zod";
import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import { fromZodError } from "zod-validation-error";

export function validateWithZodSchema<T>(
    schema: ZodSchema<T>,
    data: unknown
){
    const result = schema.safeParse(data);

    //----> Check for error
    if (!result.success) {
        const validationError = fromZodError(result.error);
        return NextResponse.json(validationError.message, {status: StatusCodes.BAD_REQUEST})
    }
    //NextResponse.next()
    return result;
}
