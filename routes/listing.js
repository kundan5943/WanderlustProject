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


const {storage}=require('../cloudConfig.js');


// Multer
const multer  = require('multer');
const upload = multer({storage});


const listingController=require('../Controller/listings.js');

router.get("/",(req,res)=>
{
    res.render("home.ejs");
});

// All Listings
router.get('/allListings', listingController.allListings);


// Categories
// trending
router.get("/allListings/trending",async(req,res)=>
    {   
        let str="Trending";
        let data= await Listing.find({category:"Trending"});
       
        res.render("filter.ejs",{data,str});

    });

    router.get("/allListings/rooms",async(req,res)=>
    {   
        let str="rooms";
        let data= await Listing.find({category:"Rooms"});
       
        res.render("filter.ejs",{data,str});

    });
    router.get("/allListings/iconic",async(req,res)=>
    {   
        let str="Iconic cities";
        let data= await Listing.find({category:"Iconic Cities"});
       
        res.render("filter.ejs",{data,str});

    });
    router.get("/allListings/pools",async(req,res)=>
    {   
        let str="Amazing pools";
        let data= await Listing.find({category:"Amazing pools"});
       
        res.render("filter.ejs",{data,str});

    });
    router.get("/allListings/mountains",async(req,res)=>
    {   
        let str="Mountains";
        let data= await Listing.find({category:"Mountains"});
       
        res.render("filter.ejs",{data,str});

    });
    router.get("/allListings/camping",async(req,res)=>
    {   
        let str="Camping";
        let data= await Listing.find({category:"Camping"});
        console.log(data);
        res.render("filter.ejs",{data,str});

    });
    router.get("/allListings/boats",async(req,res)=>
    {   
        let str="Boats";
        let data= await Listing.find({category:"Boats"});
        console.log(data);
        res.render("filter.ejs",{data,str});

    });
    router.get("/allListings/farm",async(req,res)=>
    {   
        let str="Farms";
        let data= await Listing.find({category:"Farms"});
        console.log(data);
        res.render("filter.ejs",{data,str});

    });
     router.get("/allListings/beach",async(req,res)=>
    {   
        let str="Beach";
        let data= await Listing.find({category:"Beach"});
       
        res.render("filter.ejs",{data,str});

    });



    router.post("/allListings/search",async(req,res)=>
        {   
            let dta=req.body.query;
             let data=await Listing.find({title:dta});
            
             if(data.length==0)
             { 
                data=await Listing.find({location:dta});
                if(data.length==0)
                {
                    data=await Listing.find({country:dta});
                }
             }

             console.log(data);
             res.render("search.ejs",{data});
        });

router.get('/indetail/:id',listingController.seeIndetail);


// Follwing comment is a mistake
/*router.post("/edit",isLogedIn,(req,res)=>
{   
    let data=req.body;
    res.render('editListing.ejs',{data});

});*/


// Edit Route
router.get('/edit/:id',isLogedIn,checkOwner,listingController.editListing);

// Confirm Edit
router.post('/edit/confirmEdit',isLogedIn,upload.single('image'),wrapAsync(listingController.confirmEdit));


// // NewListings Form
// router.get('/addnew',isLogedIn,listingController.newListing);

// // Add newlisting
// router.post('/addnew',wrapAsync(listingController.addNewListing));


router.route('/addnew')
      .get(isLogedIn,listingController.newListing)
      .post(isLogedIn,upload.single('image'),wrapAsync(listingController.addNewListing));
    // .post(upload.single('image'),(req,res)=>
    // {
    //     res.send(req.file.path);
    // });

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

router.delete('/delete/:id',isLogedIn,checkOwner,wrapAsync(listingController.deleteListing));


module.exports=router;









