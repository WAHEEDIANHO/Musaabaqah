import {Application, NextFunction, Request, Response} from "express";
import {body, validationResult} from 'express-validator'
import CompetitonService from "../service/CompetitonService";
import BadRequestError from "../utils/BadRequestError";
import {COMPETITION_STATUS, STATUS_CODES} from "../utils/app-errors";
import {ICompetition} from "../Data/Dto/ICompetition";
import AppResponse from "../utils/Response";

export = (app: Application) => {

    const baseUrl: string = "/api/v1"
    const service = new CompetitonService()

    app.route(`${baseUrl}/competition`)
        .post(
            body("name", "Field Required").trim().notEmpty(),
            body("question", "Field Required with number value").isNumeric(),

        async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const err = validationResult(req);
                    if(!err.isEmpty()) throw new BadRequestError(err.array())

                    const competition: ICompetition = {
                        name: req.body.name,
                        question: req.body.question,
                        time: req.body.time,
                        status: COMPETITION_STATUS.PENDING
                    }
                    await service.create(competition);
                    res.status(STATUS_CODES.OK).json(new AppResponse(STATUS_CODES.OK, "success"))
                }catch (e: any) {
                    console.log(e)
                    next(e)
                }
            }
        )
        .get(async (req: Request, res: Response, next: NextFunction) => {
            try{
                const competitions: ICompetition[] = await service.getAllCompetions();
                return res.status(STATUS_CODES.OK).json(new AppResponse(STATUS_CODES.OK, "success", competitions))

            }catch (e: any) {
                next(e)
            }
        }).all((req, res, next) => {
            try {
                throw new BadRequestError("Http Method not allow", "Bad request")
            }catch (e: any) {
                next(e)
            }
    })
}