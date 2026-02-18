const express=require('express');
const router=express.Router();
const User=require('../Model/user.js');
const wrapAsync=require('../util/wrapAsync.js');
const passport=require('passport');
const {savedUrl}=require('../middleware/checklogin.js');
router.get("/signup",(req,res)=>
{
    res.render('Authenticate/signupForm.ejs');

});

router.post('/signup',async(req,res)=>
{  
   try{

  
    let {email,username,password}=req.body;
    let newUser=new User({email:email,username:username});

     let registerdUser= await User.register(newUser,password);
     
   //   if(registerdUser)
   //   {
   //      req.flash("success","Welcome To Wanderlust");
        
   //   }
     req.login(registerdUser,(err)=>
      {
         if(err)
         {
          return next(err);
         }
         
      // console.log(registerdUser);
       req.flash("success","Welcome To Wanderlust");
      res.redirect("/wanderlust/allListings");
      });
    
     }
     catch(err)
     {
        req.flash("error",err.message);   
        res.redirect("/wanderlust/authenticate/signup");
     }
       
     

});

// Login
router.get('/login',(req,res)=>
{
     res.render('Authenticate/loginForm.ejs');

});
router.post('/login',savedUrl,passport.authenticate('local',{failureRedirect:'/wanderlust/authenticate/login',failureFlash:true}),
async(req,res)=>
{
  
  req.flash("success",'Welcome back to Wanderlust');

  
  // console.log(res.locals.redirectUrl);
//  let redirectUrl=res.locals.redirectUrl || '/wanderlust/listings';  this is also a good way
     let redirectUrl;
      if(res.locals.redirectUrl)
      {  
         redirectUrl=res.locals.redirectUrl;

      }
      else
      {
         redirectUrl='/wanderlust/allListings';
      }

          if (redirectUrl.includes('/delete')||redirectUrl.includes('/addReview'))
             {
                redirectUrl = '/wanderlust/allListings';
             }
      
  res.redirect(`${redirectUrl}`);
 

});


// Logout
router.get('/logout',async (req,res,next)=>
{
    req.logout((err)=>
   {
      if(err)
      {
        return next(err);
      }

    req.flash("success","You Logged Out");
   res.redirect('/wanderlust/allListings');
   });
  
  
});

module.exports=router;