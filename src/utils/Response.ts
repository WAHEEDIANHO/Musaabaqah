import {IResponse} from "../Data/Dto/IResponse";

class AppResponse implements IResponse{

    data?: Object;
    message: string;
    status: number;
    constructor(status: number, message: string, data?: Object) {
        this.status = status;
        this.message = message;
        this.data = data
    }
}

export default AppResponse