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

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = {
  Review,
  reviewSchema,
};
