import express from "express";
import cors from "corse";
import mongoose from "mongoose";
import { json } from "stream/consumers";
mongoose.connect("mongodb+srv://hammadali:hammad123@cluster0.gttlm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

const User = mongoose.model("User",{
    name:String,
    email:String,
    address:String
});
const app=express();
const port= process.env.PORT || 3000;

app.use(cors());
app.use(express(json));

app.get("/",(req,res)=>{
    res.send("Hello World")
});

app.get("/users",(req,res)=>{
    User.find({},(err,users)=>{
        if(!err){
            res.send(users)
        }
        else{
            res.status(500).send("Error Occured!")
        }
    })
})