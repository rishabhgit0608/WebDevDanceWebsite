const express = require("express");
const fs = require("fs");
const port = 800;
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser =require('body-parser');
mongoose.connect('mongodb://localhost/mongooseDance', {useNewUrlParser: true});

//Mongoose Specific Stuff

//1.Defining Mongoose Schema

const kittySchema = new mongoose.Schema({
    name: String,
    phone:Number,
    email:String,
    culture:String,
    genre:String
});

//2.Defining mongoose model

const Contact = mongoose.model('DanceForms', kittySchema);

//Express specific stuff

app.use('/static',express.static("static")); //For serving static files

app.use(express.urlencoded());

//pug specific stuff

app.set('view engine','pug');//set the template engine as pug

app.set('views',path.join(__dirname,'views')); //set the views directory

//endpoints

app.get('/',(req,res)=>{
    
    res.status(200).render('home.pug',{}) ;
});
app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug',{}) ;
});

app.post("/contact",(req,res)=>{
    var myData = new Contact(req.body);
    myData.save()
    .then(()=>{
        res.send("Your Response was saved");
    }).catch(()=>{
        res.send("Your response was not saved to the database");
    })
});

//Starting the server
app.listen(port,()=>{
     console.log(`The new server is started @ port number ${port}`);
});
