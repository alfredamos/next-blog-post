import { ZodType as ZodSchema } from "zod";
import {StatusCodes} from "http-status-codes";
import {CustomError} from "@/utils/customError.util";
import {extractZodErrorMessages} from "@/validations/extractZodErrorMessages.util";

export function validateWithZodSchema<T>(
    schema: ZodSchema<T>,
    values: unknown
){
    const result = schema.safeParse(values);

    //----> Check for error
    if (!result.success) {
        //----> Extract error message.
        const errors = extractZodErrorMessages(result.error);
        throw new CustomError("Validation Error", errors.join(", "), StatusCodes.BAD_REQUEST);
    }
    const {data} = result;
    return {data};
}
