const mongoose=require("mongoose");
// const passportLocalMongoose = require('passport-local-mongoose');
const passportLocalMongoose = require('passport-local-mongoose').default;



async function main()
{
    await  mongoose.connect('mongodb://127.0.0.1:27017/Wanderlust');
}
main().then(()=>
{
    console.log("connection successfull");

}).catch((err)=>
{
    console.log("connection successfull");

});

const userSchema=new mongoose.Schema(
    {
        email:{
            type:String,
            required:true
        }
    }
);



userSchema.plugin(passportLocalMongoose);

const User=mongoose.model("User",userSchema);

// let fakeuser1=new User({email:"Aaditya@gmail.com",username:"Aaditya01"});

// User.register(fakeuser1,"#Aaditya8451").then((res)=>{console.log(res)}).catch((err)=>{console.log(err)});;





module.exports=User;
