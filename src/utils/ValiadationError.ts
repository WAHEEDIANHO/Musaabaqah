import AppError from "./AppError";

class ValidationError extends AppError {
    constructor(description: string = 'Validation Error', errorStack: any){
        super('BAD REQUEST', STATUS_CODES.BAD_REQUEST,description,true, errorStack);
    }
}

export default ValidationError
