import Competition from "../Model/Competition";
import {ICompetitionRepository} from "./IRespository";
import {Types} from "mongoose";
import {ICompetition} from "../Dto/ICompetition";
import APIError from "../../utils/APIError";
import {STATUS_CODES} from "../../utils/app-errors";

export class CompetitionRepository implements ICompetitionRepository{
    async Delete(id: Types.ObjectId): Promise<void> {
        try{
            await Competition.findByIdAndDelete(id)
        }catch (e: any) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Delete Competition')
        }
    }

    async Update(entity: ICompetition): Promise<void> {
        try{
            await Competition.findByIdAndUpdate(entity.id, entity);
        }catch (e) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Update Competition')
        }
    }

    async create(entity: ICompetition): Promise<void> {
        try{
            const competition = new Competition(entity);
            await competition.save();
        }catch (e) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Competition')
        }

        // await Competition.create(entity);
    }

    async getAll(): Promise<ICompetition[]> {
        try{
            return Competition.find();
        }catch (e) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to get Competitions')
        }
    }

    async getById(id: Types.ObjectId): Promise<ICompetition> {
        try{
            return Competition.findById(id);
        }catch (e) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to get Competition')
        }
    }


}