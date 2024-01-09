import type {Types} from 'mongoose'
import {ICompetition} from "../Dto/ICompetition";

export interface IGenericRepository<T> {
        create(entity: T): Promise<void>;
    getById(id: Types.ObjectId): Promise<T>;
    getAll(): Promise<T[]>;
    Delete(id: Types.ObjectId): Promise<void>;
    Update(entity: T): Promise<void>
}

export interface ICompetitionRepository extends IGenericRepository<ICompetition>{

}