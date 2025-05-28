const express=require('express')
const router=express.Router();
const Person=require('./../models/person')

router.post('/',async (req,res)=>{
    try{
    const data=req.body
    const newPerson=new Person(data);
    const response= await newPerson.save();
    console.log("data saved")
    res.status(200).json(response);
    }
    
catch(err){
console.log(err);

}
})

router.get('/',async(req,res)=>{
    try{
        const data= await Person.find();
console.log('data fetched');
res.status(200).json(data);
    }
    catch(err){
console.log(err);
res.status(500).json({error:'internal server error'})
    }
})


router.get('/:workType',async(req,res)=>{
    try{
const worktype=req.params.workType;
if(worktype=='chef'||worktype=='manager'||worktype=='waiter'){
const response=await Person.find({work:worktype});
console.log("response fetcheed");
res.status(200).json(response)
}else{
    res.status(404).json({error:"internal server error"})
}
    }
    catch(err){
console.log(err);
res.status(500).json({error:'internal server error'})
    }
})


router.put('/:id',async (req,res)=>{
    try{
const personid=req.params.id
const updatepersondata=req.body
const response=await Person.findByIdAndUpdate(personid,updatepersondata,{
    new:true,
    runValidators:true,
})

if(!response){
    return res.status(404).json({error:"person not found"})
}
console.log("data updated")
res.status(200).json(response)
    }catch(err){
console.log(err);
res.status(500).json({error:'internal server error'})
    }
})


router.delete('/:id',async(req,res)=>{
    try{

  
    const personid=req.params.id
    const response=await Person.findByIdAndDelete(personid)
    if(!response){
    return res.status(404).json({error:"person not found"})
}else{
    console.log("data deleted")
    res.status(200).json({message:"data deleted successfully"})
}
  }catch(err){
    console.log(err);
res.status(500).json({error:'internal server error'})
  }
})


module.exports=router
//comment add for Testing Purpose V.2.0