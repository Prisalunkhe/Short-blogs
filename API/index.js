require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { v4: uuidv4 }  = require('uuid');
const User = require('./models/users')
const  bodyParser = require('body-parser');

const app = express();
const PORT  =process.env.port; 

const mongoURL = process.env.DATABASE_URL;
const databasePromise = mongoose.connect(mongoURL);

var jsonParser = bodyParser.json();

//query with email is same email exist in user database
app.post('/signup',jsonParser,async (req,res) => {
    const existingUser = await User.findOne({email:req.body.email})
    console.log(existingUser,"existingUser");
    if(existingUser){
        return res
        .send({error:"User already exists please login"})
        .statusCode(400);
    }
    const authToken = uuidv4();
    try{
        const newUser = new User({...req.body, authToken : [authToken] });
    newUser.save();
}catch(error){
    console.log(error).status(400);
}
return res.send({msg:"User created successfully",authToken})
});

databasePromise.then(()=>{
    app.listen( PORT, () => {
        console.log(`app listening on port ${PORT}`);
      }) ; 
}).catch((err)=>{
    console.log("DB connection failed",err);
});
