const express=require('express');
const router= express.Router();
const wrapAsync=require('../util/wrapAsync');
const{Listing,listingSchema}=require("../Model/listings");
const {Review,reviewSchema}=require('../Model/Review');
const ExpressError=require('../util/expressError');
const isLogedIn=require('../middleware/checklogin');
const {checkOwner}=require('../middleware/owner.js');
// const {validateListing}=require('../middleware/validate.js');
// const flash=require('connect-flash');
router.get("/",(req,res)=>
{
    res.render("home.ejs");
});

router.get('/allListings', async (req,res)=>
{
 
  let data= await Listing.find();

  res.render("allListings.ejs",{data});
});

router.get('/indetail/:id',async (req,res)=>
{   
    
    let id=req.params.id;
   
   let data= await Listing.findById(`${id}`).populate({path:'reviews',populate:{path:'author'}}).populate('owner');
  //  console.log(data);
    
   if(!data)
   {
    req.flash("error","This Listing is not available");
     res.redirect('/wanderlust/allListings');
   }
   else{
     res.render("indetail.ejs",{data});

   }
//   console.log(data.reviews);
//   console.log(data.reviews[0].comment);

});


// Follwing comment is a mistake
/*router.post("/edit",isLogedIn,(req,res)=>
{   
    let data=req.body;
    res.render('editListing.ejs',{data});

});*/


// Edit Route
router.get('/edit/:id',isLogedIn,checkOwner,async(req,res,next)=>
{   
   console.log("accepted");  
   let {id}=req.params;

   let user =await Listing.findById(id);
   console.log(user);

     res.render('editlisting',{data:user});
});

router.post('/edit/confirmEdit',wrapAsync(async (req,res,next)=>
{
    try
    {    
           let data= req.body;
          
    await Listing.findByIdAndUpdate(data._id,data,{runValidators: true,new:true}).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)});
    
    
    }catch(err)
    {
        req.flash("error",err.message);
   
    }
    req.flash("success","listing Edited successfully");
     res.redirect('/wanderlust/allListings');
}));


// NewListings
router.get('/new',isLogedIn,(req,res)=>
{  
    console.log(req.user);
    res.render('newListing.ejs');

       
});

router.post('/addnew',wrapAsync(async(req,res,next)=>
{   
    let data=req.body;
  
    if(!data)
    {
      return next(new ExpressError(400,"Bad Request"));
    }
    
    req.flash("success","Listing added successfully");
     
    
    // console.log(req.flash("success"));
    let nwlisting=new Listing(data);
    // nwlisting.owner=req.user.
    // console.log(req);
    // console.log(req.user);

    nwlisting.owner=req.user._id;
    await nwlisting.save();

    res.redirect('/wanderlust/allListings'); 
}));


// AddReview
// router.post('/addReview',async (req,res)=>
// {   
    
//     let rtg=req.body.rating;
//     let cmnt=req.body.comment;
//     console.log(rtg,cmnt);

//     let listing= await Listing.findById(req.params.id);
   
//     let revw1=new Review({rating:rtg,comment:cmnt});

//     listing.reviews.push(revw1);
//      console.log(listing);
//  await revw1.save().then((res)=>{console.log(res)}).catch((err)=>
//     {
//         console.log(err);

//     });

//     listing.save().then((res)=>{console.log(res)}).catch((err)=>{console.log(err)});
//     res.redirect(`/wanderlust/indetail/${req.params.id}`);
    
// });

// Deleting Reviews from indetail
// router.delete('/:rvwId/deletereview',async (req,res)=>
// {  

//     let id=req.params.listingid;
//     let rvwId=req.params.rvwid;
     
//    await Listing.findByIdAndUpdate(id,{$pull:{reviews:rvwId}}).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)});
//    await Review.findByIdAndDelete({_id:rvwId}).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)});

//     // res.redirect(`/wanderlust/indetail/${id}`);
//      res.redirect(`/wanderlust/indetail/${id}`);

// });

// Deleting Listing from Indetail
router.delete('/delete/:id',isLogedIn,checkOwner,wrapAsync(async(req,res)=>
{   
     let id =req.params.id;
 

    console.log(req.params);
    // let listing=await Listing.findById(id);
    // if(!listing.owner._id.equals(res.locals.currUser._id))
    // {  
    //    req.flash('error','You are not the owner of this Listing');
     
    //    return res.redirect(`/wanderlust/indetail/${id}`);
    // }

    let deletedlisting=await Listing.findByIdAndDelete(id);
    
    if(deletedlisting)
    {
      req.flash("success","Listing Deleted Successfully");
    }
    else
    {
       req.flash("error","Listing Already Deleted");
    }
    // console.log(deletedlisting);
    
    
    res.redirect('/wanderlust/allListings');

}));








module.exports=router;









