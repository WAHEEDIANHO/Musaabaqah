import {config} from 'dotenv'
import * as process from "process";
config();

class Config  {

    private static _PORT: string = process.env.PORT || '';
    private static _DB_URL: string= process.env.MONGODB_URI|| ''

    static get PORT(): string {
        return this._PORT;
    }
    static get DB_URL(): string {
        return this._DB_URL;
    }
}

export default Config

