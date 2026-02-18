const mongoose=require("mongoose");

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
const {Review,reviewSchema}=require('./Review');
const listingSchema=new mongoose.Schema(
    {
        title:{
              type:String,
              required:true
        },
        description:{
            type:String,
            required:true

        },
        image:{
            type:String,
            default:"data:image/png;base64,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",
            set:(v)=>v===""?"data:image/png;base64,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":v
        },
        price:{
            type:Number,
            required:true
        },
        location:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        },
        reviews:
            [
            {
                type:mongoose.Schema.Types.ObjectId,ref:'Review'
            }
            ],
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }

    }
);
listingSchema.post('findOneAndDelete', async (listing)=>
{  
     if(listing)
    {
       if(listing.reviews)
    {
        let res=await Review.deleteMany({_id:{$in:listing.reviews}});
        console.log(res);

    }
    }
    
   

     
      
});
const Listing=mongoose.model("Listing",listingSchema);



module.exports={Listing,listingSchema};