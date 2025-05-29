const passport=require("passport");
const localstrategy= require('passport-local').Strategy;
const Person=require('./models/person')

passport.use(new localstrategy(async(USERNAME,password,done)=>{
try {
   
    const user=await Person.findOne({username:USERNAME})
    if(!user)
        return done(null,false,{message:'Incorrect Username'})
    const isPasswordmatch=await user.comparePassword(password)

    if(isPasswordmatch){
        return done(null,user);
    }else{
        return done(null,false,{message:'Incorrect Password'})
    }
    
} catch (error) {
    return done(error)
}
}))


module.exports=passport