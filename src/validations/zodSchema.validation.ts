import { ZodType as ZodSchema } from "zod";
import {StatusCodes} from "http-status-codes";
import {CustomError} from "@/utils/customError.util";
import {extractZodErrorMessages} from "@/validations/extractZodErrorMessages.util";

export function validateWithZodSchema<T>(
    schema: ZodSchema<T>,
    data: unknown
){
    const result = schema.safeParse(data);

    //----> Check for error
    if (!result.success) {
        //----> Extract error message.
        const errors = extractZodErrorMessages(result.error);
        return new CustomError("Validation Error", errors.join(", "), StatusCodes.BAD_REQUEST);
    }
    return result;
}
