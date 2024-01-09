import {Types} from "mongoose";

export enum STATUS_CODES {
    OK= 200,
    BAD_REQUEST= 400,
    UN_AUTHORISED= 403,
    NOT_FOUND= 404,
    INTERNAL_ERROR= 500,
}

export enum COMPETITION_STATUS {
    PENDING,
    START,
    END
}

export enum EVENT {
    JUDGES="JUDGES",
    JOIN="JOIN",
    GENERATE_QUESTION="GENERATE_QUESTION",
    QUESTION="QUESTION",
    JUZ_RANGE_SELECTION="JUZ_RANGE_SELECTION",
    ERROR= "ERROR",
    DONE= "DONE"
}


export interface IQuestion {
    start: number, // 1
    end: number, // not more than 30
    questionNo: number,
    room: string
}