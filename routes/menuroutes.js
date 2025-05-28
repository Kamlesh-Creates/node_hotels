const express=require('express')
const router=express.Router();

const menu=require('./../models/menu')
router.post('/',async (req,res)=>{
    try{
    const data=req.body
    const newmenu=new menu(data);
    const response= await newmenu.save();
    console.log("data saved")
    res.status(200).json(response);
    }
    
catch(err){
console.log(err);

}
})

router.get('/',async(req,res)=>{
    try{
        const data= await menu.find();
console.log('data fetched');
res.status(200).json(data);
    }
    catch(err){
console.log(err);
res.status(500).json({error:'internal server error'})
    }
})

module.exports=router