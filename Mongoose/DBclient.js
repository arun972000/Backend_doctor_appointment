import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

const DBclient = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.jrqwilq.mongodb.net/DoctorAppointmnet?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB connected");
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
    }
};

export default DBclient;

