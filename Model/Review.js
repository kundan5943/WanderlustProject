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

const reviewSchema=new mongoose.Schema(
    {
        rating:{type:Number,
            min:1,
            max:5,
            required:true
        },
        comment:{
                type:String,
                required: true,
                trim: true,
                minlength: 1
        },
        author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        }
    }
);

const Review=mongoose.model('Review',reviewSchema);

module.exports={
    Review,
    reviewSchema
};
