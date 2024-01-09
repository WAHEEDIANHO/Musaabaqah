// import {CompetitionRepository} from "../Data/Repository/CompetitionRepository";
import {ICompetitionRepository} from "../Data/Repository/IRespository";
import {CompetitionRepository} from "../Data/Repository/CompetitionRepository";
import {ICompetition} from "../Data/Dto/ICompetition";
import {Types} from "mongoose";


class CompetitionService {

    private repository: ICompetitionRepository
    constructor() {
        this.repository = new CompetitionRepository();
    }

    async create(competition: ICompetition): Promise<boolean> {
        try{
            await this.repository.create(competition);
            return true
        }catch (e: any) {
            throw e;
        }
    }

    async getAllCompetions(): Promise<ICompetition[]> {
        try{
            const competitions: Promise<ICompetition[]> = this.repository.getAll();
            return competitions
        }catch (e: any){
            throw e;
        }
    }

    async getCompetitionsById(id: Types.ObjectId): Promise<ICompetition> {
        try{
            const competition: Promise<ICompetition> = this.repository.getById(id);
            return competition
        }catch (e: any){
            throw e;
        }
    }
}

export default CompetitionService