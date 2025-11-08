import {StatusCodes} from "http-status-codes";

export class ResponseMessageUtil{
    constructor(public message: string, public status: string, statusCode: StatusCodes) {
    }
}