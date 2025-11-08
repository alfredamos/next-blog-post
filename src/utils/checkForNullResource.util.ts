import {StatusCodes} from "http-status-codes";
import {CustomError} from "@/utils/customError.util";

export function resourceIsNullOrUndefined(resourceName: string) {
    return new CustomError("Not found", `This ${resourceName} is not found in db!`,StatusCodes.NOT_FOUND);
}