const mongoose= require("mongoose");
const bcrypt=require('bcrypt')
const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
    type:Number,
    required:true
    },
    work:{
        type:String,
        enum: ['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
});
personSchema.pre('save',async function(next) {
    const person = this;

    if(!person.isModified('password')) return next();
    try {
        //hash password generate
        const salt=await bcrypt.genSalt(10);
        //hash password
        const hashedpassword=await bcrypt.hash(person.password,salt)
        person.password=hashedpassword
        next()
    } catch (error) {
        return next(err)
    }
})
personSchema.methods.comparePassword = async function (candidatepassword) {
    try {
        const isMatch=await bcrypt.compare(candidatepassword,this.password);
        return isMatch;
        
    } catch (error) {
        throw err
    }
}
const Person=mongoose.model('Person',personSchema);
module.exports=Person;