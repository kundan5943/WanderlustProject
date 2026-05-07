const express=require('express');
const router= express.Router({ mergeParams: true });
const wrapAsync=require('../util/wrapAsync');
const{Listing,listingSchema}=require("../Model/listings");
const {Review,reviewSchema}=require('../Model/Review');
const isLogedIn=require('../middleware/checklogin');
const {checkAuthor}=require('../middleware/owner');


const reviewController=require("../Controller/reviews");
// AddReview
router.post('/addReview',isLogedIn,wrapAsync(reviewController.addReview));



// Deleting Reviews from indetail
router.delete('/:rvwid/deletereview',isLogedIn,checkAuthor,wrapAsync(reviewController.deleteReview));



module.exports=router;
