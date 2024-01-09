import AppError from "./AppError";
import {STATUS_CODES} from "./app-errors";

class BadRequestError extends AppError {
    constructor( logingErrorResponse: any, description: string= 'Bad request'){
        super('NOT FOUND', STATUS_CODES.BAD_REQUEST,description,true, false, logingErrorResponse);
    }
}


export default BadRequestError;