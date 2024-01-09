import {Types} from "mongoose";
import {COMPETITION_STATUS} from "../../utils/app-errors";

export interface ICompetition {
    id?: Types.ObjectId,
    name: string,
    question: number,
    date?: Date | null,
    status: COMPETITION_STATUS,
}