import mongoose from 'mongoose';
import Config from '../config';

const databaseConnection = async() => {

    try {
        await mongoose.connect(Config.DB_URL);
        console.log('Db Connected');

    } catch (error) {
        console.log('Error ============')
        console.log(error);
        process.exit(1);
    }

};


export {
    databaseConnection
}

