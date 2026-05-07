const mongoose = require("mongoose");

async function main() {
  await mongoose.connect(
    "mongodb+srv://kundanchau624_db_user:H2w40BxaddbYE8XV@wanderlustcluster.z8mndjy.mongodb.net/?appName=WanderlustCluster",
  );
}
main()
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => {
    console.log("connection successfull");
  });
const { Review, reviewSchema } = require("./Review");
const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    url: String,
    filename: String,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
    enum: [
      "Trending",
      "Rooms",
      "Iconic Cities",
      "Amazing pools",
      "Camping",
      "Mountains",
      "Boats",
      "Farms",
      "Beach",
    ],
  },
});
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    if (listing.reviews) {
      let res = await Review.deleteMany({ _id: { $in: listing.reviews } });
      console.log(res);
    }
  }
});
const Listing = mongoose.model("Listing", listingSchema);

module.exports = { Listing, listingSchema };
