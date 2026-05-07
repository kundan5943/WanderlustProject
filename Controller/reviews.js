 const{Listing,listingSchema}=require("../Model/listings");
const {Review,reviewSchema}=require('../Model/Review');


module.exports.addReview=async (req,res,next)=>
   {   
       try {
                 console.log(req.params.id);
                
                // if(!req.user)
                // {
                //     req.flash('error','You Must LogIn to add review');
                //     return res.redirect(`/wanderlust/indetail/${req.params.id}`)
                // }

                let rtg=req.body.rating;
                let cmnt=req.body.comment;
                console.log(rtg,cmnt);

                let listing= await Listing.findById(req.params.id);

                let nwrevw=new Review({rating:rtg,comment:cmnt});
    
    if(nwrevw)
    {
        req.flash("success","Review Added Successfully");
    }
     
      nwrevw.author=req.user._id;

    // listing.reviews.push(nwrevw);
    //  console.log(listing);
    await nwrevw.save();
    listing.reviews.push(nwrevw);
    listing.save().then((res)=>{console.log(res)}).catch((err)=>{console.log(err)});
    
    

    res.redirect(`/wanderlust/indetail/${req.params.id}`);
    
       } catch (err) {
           next(err);
       }
            
            
           
    
};


module.exports.deleteReview=async (req,res,error)=>
{  
    console.log(req.params.id);

    let id=req.params.id;
    let rvwId=req.params.rvwid;
     
   await Listing.findByIdAndUpdate(id,{$pull:{reviews:rvwId}}).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)});
   await Review.findByIdAndDelete({_id:rvwId}).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)});
      
      req.flash('success','Review Deleted Successfully');
   
    // res.redirect(`/wanderlust/indetail/${id}`);
     res.redirect(`/wanderlust/indetail/${id}`);

};