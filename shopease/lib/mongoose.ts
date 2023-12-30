import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URI) return console.log('MONGODB_URI not connected');

    if(isConnected) {
        return console.log('=> using exciting database connection');
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        isConnected = true;
        console.log("DB Connected!")
    } catch (error) {
        console.log(error)
    }
}