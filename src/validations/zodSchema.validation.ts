import { StatusCodes } from "http-status-codes";
import { ZodType as ZodSchema } from "zod";
import { fromZodError } from "zod-validation-error";
import {CustomError} from "@/utils/customError.util";

export function validateWithZodSchema<T>(
    schema: ZodSchema<T>,
    data: unknown
): T {
    const result = schema.safeParse(data);

    if (!result.success) {
        const validationError = fromZodError(result.error);
        throw new CustomError("Validation error", validationError.message, StatusCodes.BAD_REQUEST);
    }

    return result.data;
}
