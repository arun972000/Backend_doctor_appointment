import express, { json } from "express";
import { appoinment } from "../Mongoose/model.js";
import { v4 } from "uuid";


const doctorRoutes = express.Router()

doctorRoutes.use(json())


doctorRoutes.post("/appointment",async(req,res)=>{
    try{
        const payload=req.body
        const appointment= new appoinment({...payload,id:v4(),state:"pending"})
        await appointment.save();
        res.status(200).send("appoinment booked")
    }catch(err){
        res.status(500).send(err.message)
    }
})

doctorRoutes.delete("/appoinmentRemove/:id",async(req,res)=>{
    try{
        const {id} =req.params
        await appoinment.deleteOne({id})
        res.status(200).send("appoinment deleted")
    }catch(err){
        res.status(500).send(err.message)
    }
})

doctorRoutes.put("/appoinmentupdate/:id",async(req,res)=>{
    try{
        const {id} =req.params
        await appoinment.updateOne({id},{$set:{state:"booked"}})
        res.status(200).send("appoinment updated")
    }catch(err){
        res.status(500).send(err.message)
    }
})


doctorRoutes.get("/appointmentlist",async(req,res)=>{
    try{
        const newappointment =await appoinment.find({});
        res.status(200).json(newappointment)
    }catch(err){
        res.status(500).send(err.message)
    }
})

doctorRoutes.get("/appointmentlistforPatient",async(req,res)=>{
    try{
        const payload=req.body;
        const appointment =await appoinment.find({email:payload.email});
        res.json(appointment)
    }catch(err){
        res.status(500).send(err.message)
    }
})

export default doctorRoutes