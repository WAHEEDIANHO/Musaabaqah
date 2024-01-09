import { createServer } from "http";
import { Server as SocketServer } from "socket.io";

import express from 'express';
import Config from './config';
import { databaseConnection } from './Data/conn';
import expressApp from './app';

const StartServer = async() => {

    const app = express();
    await databaseConnection();

    const httpServer = createServer(app);
    const io = new SocketServer(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    await expressApp(app, io);


    // const channel = await CreateChannel()
    // await expressApp(app, channel);


    httpServer.listen(Config.PORT, () => {
        console.log(`listening to port ${Config.PORT}`);
    })
        .on('error', (err) => {
            console.log(err);
            process.exit();
        })
}

StartServer();