import {Application, NextFunction, Request, Response} from 'express'
const authController = (app: Application) => {

    app.route("/auth")
        .get((req: Request, res: Response, next) => {
            res.json({msg: "jhksj"})
        });
}
export default authController;