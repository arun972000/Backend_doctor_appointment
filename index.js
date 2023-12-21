import express, { json } from 'express';
import DBclient from './Mongoose/DBclient.js';
import cors from "cors"
import userRoutes from './Routes/userRoutes.js';
import doctorRoutes from './Routes/doctorRoutes.js';


const app = express();

await DBclient()

app.use(cors({
    origin: "*",
}))

app.use(json())

app.use("/api",userRoutes)
app.use("/api",doctorRoutes)


const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    res.json({ status: true, message: "Our node.js app works" })
});

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));