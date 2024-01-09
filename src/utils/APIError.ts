import AppError from "./AppError";
import {STATUS_CODES} from "./app-errors";

class APIError extends AppError {
    constructor(name: string, statusCode: number = STATUS_CODES.INTERNAL_ERROR, description: string ='Internal Server Error',isOperational: boolean = true,){
        super(name,statusCode,description,isOperational);
    }
}

export default APIError;