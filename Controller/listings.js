const express=require('express');
const router= express.Router();
const wrapAsync=require('../util/wrapAsync');
const{Listing,listingSchema}=require("../Model/listings");
const {Review,reviewSchema}=require('../Model/Review');
const ExpressError=require('../util/expressError');


// All Listings
module.exports.allListings=async (req,res)=>
{
 
  let data= await Listing.find();

  res.render("allListings.ejs",{data});
};

// See listing in detail
module.exports.seeIndetail=async (req,res)=>
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

};

// Edit Listing 
module.exports.editListing=async(req,res,next)=>
{   
   console.log("accepted");  
   let {id}=req.params;

   let user =await Listing.findById(id);
  //  console.log(user);
  let ogurl=user.image.url;
  ogurl=ogurl.replace('/upload','/upload/h_150,w_270');
     res.render('editlisting',{data:user,ogurl});
};

// Confirm Edit
module.exports.confirmEdit=async (req,res,next)=>
{
    
  
    try
    {    
           let data= req.body;
          
   let nwlisting= await Listing.findByIdAndUpdate(data._id,data,{runValidators: true,new:true})
   
   if(typeof req.file!=="undefined")
   {

    let url=req.file.path; 
    let filename=req.file.filename;
    nwlisting.image={url,filename};
    nwlisting.save();
  }
    
    }catch(err)
    {
        req.flash("error",err.message);
   
    }
    req.flash("success","listing Edited successfully");
     res.redirect('/wanderlust/allListings');
};

// NewListing form
module.exports.newListing=(req,res)=>
{  
   
    res.render('newListing.ejs');

       
};


module.exports.addNewListing=async(req,res,next)=>
{   
    let data=req.body;
    let url=req.file.path; 
    let filename=req.file.filename;
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
    nwlisting.image={url,filename};
     console.log(nwlisting);
    await nwlisting.save();

    res.redirect('/wanderlust/allListings'); 
};


module.exports.deleteListing=async(req,res)=>
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

};