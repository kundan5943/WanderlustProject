const{Listing}=require("../Model/listings.js");
const{Review}=require('../Model/Review.js');
module.exports.checkOwner=async(req,res,next)=>
{
    let id=req.params.id;
    let listing=await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id))
    {  
       req.flash('error','You are not the owner of this Listing');
     
       return res.redirect(`/wanderlust/indetail/${id}`);
    }
    next();
};


module.exports.checkAuthor=async(req,res,next)=>
{   
    let {id,rvwid}=req.params;
    console.log(req.params);
      let review=await Review.findById(rvwid);
      if(!review.author.equals(res.locals.currUser._id))
      {
            req.flash('error','You didnt created this review ');
     
             return res.redirect(`/wanderlust/indetail/${id}`);
      }
      next();
}
