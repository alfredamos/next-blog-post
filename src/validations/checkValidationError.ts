import {validateWithZodSchema} from "@/validations/zodSchema.validation";
import { ZodType as ZodSchema } from "zod";
import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";

export function checkValidationError<T>(schema: ZodSchema<T>, resource: T){
    console.log("In checking validation error, schema : ", schema);
    console.log("In checking validation error, resource : ", resource);
    //----> Validate input.
    const result = validateWithZodSchema<T>(schema, resource);

    //----> Check for error
    if (!result.success) {
        return NextResponse.json({message: result.error.message}, {status: StatusCodes.BAD_REQUEST})
    }
}