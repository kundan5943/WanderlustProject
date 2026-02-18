const mongoose=require("mongoose");
const{Listing}=require("./Model/listings.js");
const {data}=require('./init');
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

async function insertdata()
{
    await Listing.deleteMany({});
   let data2=data.map((obj)=>(
        {
            ...obj,
            owner:'697d9d82919fbfe98c92032a'
        }
    ));
  await  Listing.insertMany(data2).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)});

}
 
   
 insertdata();