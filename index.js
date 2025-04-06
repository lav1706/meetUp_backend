const express = require("express")
const app=express()
require("dotenv").config()
const cors = require("cors");
const {initializeDatabase}= require("./db/db.connect");
const Event = require("./model/evet.model");
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
  app.use(express.json())
initializeDatabase()

//add Event
const addEvent=async(eventInfo)=>{
try {
    let data= new Event(eventInfo)
    let saved=await data.save()
    return data
    if(saved){
        console.log("Event Added")
    }else{
        console.log("Event not Added")
    }
} catch (error) {
    console.log("Error in Adding Data",error)
}
}
app.post("/event",async(req,res)=>{
    try {
        const data=await addEvent(req.body)
        if(data){
            res.status(201).json(data)
        }else{
            res.status(404).json({message:"Event Data not found"})
        }
    } catch (error) {
        console.error("Error in Adding Data",error)
    }
})
//show Data
const showEvent=async()=>{
    try {
        const data=await Event.find()
        if(data){
            console.log("Event are found")
        }else{
            console.log("Events not found")
        }
        return data
    } catch (error) {
        console.log("Error in founding Events")
    }
}
app.get("/event",async(req,res)=>{
    try {
        const data=await showEvent()
        if(data){
            res.status(201).json(data)
        }else{
            res.status(404).json({message:"Events not Found"})
        }
    } catch (error) {
        console.log("Error in fetching Events Data")
        
    }
})
//for Delete
const deleteEvent=async(id)=>{
    try {
        const data=await Event.findByIdAndDelete({_id:id})
        if(data){
            console.log("Event is deleted")
        }else{
            console.log("Event is not Delete")
        }
        return data
    } catch (error) {
        console.log("Error in delete Event")
    }
}
app.delete("/event/:id",async(req,res)=>{
    try {
        const data=await deleteEvent(req.params.id)
        if(data){
            res.status(201).json(data)
        }else{
            res.status(404).json({message:"Event not found for deleting"})
        }
    } catch (error) {
        console.log("Error in Delete Events")
    }
})
//filter By Mode
const findByMode=async(mode)=>{
    try {
        let data=await Event.find({mode:mode})
        if(data){
            console.log("Events found")
        }else{
            console.log("Events not found by mode")
        }
        return data
    } catch (error) {
        console.log("Error in finding Event with Mode")
    }
}
app.get("/event/mode/:mode",async(req,res)=>{
    try {
        const data=await findByMode(req.params.mode)
        if(data){
            res.status(201).json(data)
        }else{
            res.status(404).json({message:"Events not found by mode"})
        }
        
    } catch (error) {
        res.status(501).json({message:"Error in finding Error"})
    }
})
//filter by tag and title
const findBytitle_tag=async(EventName)=>{
    try {
        const data=await Event.find({
            $or: [{ title: EventName }, { tags: EventName }]
          })
        if(data.length>0){
            console.log("Event Found")
        }else{
            console.log("Event not found")
        }
        return data
    } catch (error) {
        console.log("Error in finding Event")
    }
}
app.get("/event/name/:eventName",async(req,res)=>{
    try {
        const data=await findBytitle_tag(req.params.eventName)
        if(data){
            res.status(201).json(data)
        }else{
            res.status(404).json({message:"Event not found"})
        }
    } catch (error) {
      res.status(505).json({message:"Error in finding Event by Title/Tag"})  
    }
})
const port=process.env.PORT||3000

app.listen(port,()=>(
    console.log("Server is running on Port:",port)
))