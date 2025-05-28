const express=require("express")
const app=express();
const db=require('./db')
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());


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