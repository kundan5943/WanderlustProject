const express=require('express');
const app=express();
const mongoose=require('mongoose');
const methodOverride=require('method-override');
const path=require('path');
const ejsMate=require('ejs-mate');
const Listing=require("./Schema/listings");
const { throws } = require('assert');
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,"/public")));

class ExpressError extends Error{

     constructor(status,message)
     {
            super();
            this.status=status;
            this.message=message;
     }
}




app.engine('ejs',ejsMate);
async function main()
{
    await mongoose.connect('mongodb://127.0.0.1:27017/Wanderlust');
}
main().then((res)=>{console.log("Connesction Successfully Established with database")}).catch((err)=>{console.log(err);});

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));

app.use(express.urlencoded({extended:true}));

let port=8080;

app.listen(8080,()=>
{
    console.log("Server is Listening on port 8080");
});

// app.get("/Wanderlust",(req,res)=>
// {
//     res.render('home.ejs');
// });
// app.get('/wanderlust/allListings', async (req,res)=>
// {
//   let data= await Listing.find();

//   res.render("allListings.ejs",{data});
// });
let checktoken=(req,res,next)=>{
     let token=req.query.token;
    console.log(token);
    if(token==='giveaccess')
    {
       
        return next(); 
    }
    throw new ExpressError(401,"Access Denied");
}
app.use('/api',checktoken,(req,res,next)=>
{
 
    res.send('data');
});

// app.get('/api',(req,res)=>
// {   console.log("fns");
//     res.send('data');

// });
app.get('/k',(req,res)=>
{
    gsbh=fsbjh;
});


app.use('/admin',(req,res,next)=>
{
    let {user,password}=req.query;
    console.log(req.query);
    console.log(user);
    if(user==='kundan')
    {
         return next();         
    }
    throw new ExpressError(403,'Forbitten');
});
app.get('/admin',(req,res)=>
{
    res.send("data");
});
app.use((err,req,res,next)=>
{   console.log("------Error-------");
    console.log(err);
    let {status=500,message="Some Error"}=err;
  res.status(status).send(message);
});