const express=require("express")
const app=express();
const db=require('./db')
require('dotenv').config();
const bodyParser = require('body-parser');
const passport=require("./auth");


app.use(bodyParser.json());

app.use(passport.initialize());

//Middelware function for logging requests
const logrequest=(req,res,next)=>{
    console.log(`[${new Date()}]Request Made to :${req.originalUrl}`);
    next();
}
app.use(logrequest);

//Authentication For Local Path
const localauthmiddelware=passport.authenticate('local',{session:false})

app.get('/',function(req,res){
    res.send("welcome to my office")
})
app.get('/web',function(req,res){
    res.send("Here you get web information")


})

const menuitemroutes=require("./routes/menuroutes")
app.use('/menu',menuitemroutes)


const personroutes=require("./routes/personroutes")
app.use('/person',personroutes)

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("server is listing on Port:3000")
})