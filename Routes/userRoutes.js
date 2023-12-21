import express, { json } from "express";

import { v4 } from "uuid";
import bcrypt from "bcrypt"

import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
import { User } from "../Mongoose/model.js";

dotenv.config()


const userRoutes = express.Router()

userRoutes.use(json())


userRoutes.post("/register", async (req, res) => {


    try {
        const payload = req.body
        const isUser = await User.findOne({ email: payload.email })
        if (isUser) {
            return res.status(409).json({ message: "user already exists" })
        }
        const hashPassword = await bcrypt.hash(payload.password, 10)
        const user = new User({ ...payload, id: v4(), password: hashPassword })
        await user.save()
        res.status(200).json({ message: "user registered", data: user })
    }
    catch (err) {
        console.log(err.message)
        res.status(500).json({ err })
    }
})

userRoutes.post("/login", async (req, res) => {
    try {
        const payload = req.body;
        const isUser = await User.findOne({ email: payload.email })
        if (!isUser) {
            return res.status(404).json({ message: "no user found" })
        }
        const comparePassword = await bcrypt.compare(payload.password, isUser.password)

        if (!comparePassword) {
            return res.status(409).send("invalid password")
        }

        const token = jwt.sign({id:isUser.id }, process.env.JWT_SECRET,)
        res.status(200).json({ message: "login success", data: isUser, token })
    }
    catch (err) {
        console.log(err.message)
        res.status(500).json({ err })
    }
})



export default userRoutes