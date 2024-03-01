import express, {Application} from "express";
import cors from 'cors'
import { Server as SocketServer } from "socket.io";



import authController from './api/authController';
import socketAPI from './api/socket-api'
import competitionController from './api/competition'
import {ErrorHandler} from "./utils/error-handler";

const expressApp = async (app: Application, io: SocketServer): Promise<void> => {
    app.use(express.json({ limit: '1mb'}));
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(cors());
    app.use(express.static(__dirname + '/public'))

    //apis
    // app.use("/api/user", )
    authController(app)
    competitionController(app)

    // socketAPI
    socketAPI(io)

    //     ErrorHandler
    app.use(ErrorHandler)
}


export default expressApp