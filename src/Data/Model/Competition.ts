import mongoose, { Schema, model, Model } from 'mongoose'
import {ICompetition} from "../Dto/ICompetition";


const schema = new Schema({
    name: { type: String, unique: true, required: true },
    question: { type: Number, required: true },
    status: String,
    date: Date
},
    {
        timestamps: true,
        toJSON: {
            transform(doc, rec){
                rec.id = rec._id
                delete rec.__v;
                delete rec._id;
            }
        }}
)

const Competition = model<ICompetition, any, any>('Competition', schema)

export default Competition;
