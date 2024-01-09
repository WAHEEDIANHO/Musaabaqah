class AppError extends Error {

    private statusCode: number;
    private _isOperational: boolean;
    private errorStack: any;
    private logError: any;
    constructor(name: string,statusCode: number,description: string, isOperational: boolean, errorStack?: any, logingErrorResponse?: any){
        super(description);
        Object.setPrototypeOf(this,new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        this._isOperational = isOperational
        this.errorStack = errorStack;
        this.logError = logingErrorResponse;
        Error.captureStackTrace(this);
    }

    get isOperational(): boolean {
        return this._isOperational;
    }
}

export default AppError