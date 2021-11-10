import express from "express";
import cors from "cors";
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
});

app.get("/user/:id",(req,res)=>{
    User.findOne({_id:req.params.id},(err,user)=>{
        if(!err){
            res.send(user)
        }
        else{
            res.status(500).send("Error Occured!")
        }
    })
})

app.post("/user",(req,res)=>{
    if (!req.body.name|| !req.body.email || !req.body.address){
        res.status(400).send("invalid data")
    }
    else{
        const newUser= new User({
            name:req.body.name,
            email:req.body.email,
            address:req.body.address
        });
        newUser.savae().then(()=>{
            console.log("user created");
            res.send("User Created")
        });
    }
});
app.put("/user/:id",(req,res)=>{
    let updateObj={}

    if (req.body.name){
        updateObj.name=req.body.name
    }
    if (req.body.email){
        updateObj.email=req.body.email
    }
    if (req.body.address){
        updateObj.address=req.body.address
    }
    User.findByIdAndUpdate(req.params.id,updateObj,{new:true},(err,data)=>{
        if(!err){
            res.send(data)
        }
        else{
            res.status(500).send("error occured!")
        }

    })


})

app.listen(port,()=>{
    console.log(`Example app listening at https://localhost:${port}`);
})
