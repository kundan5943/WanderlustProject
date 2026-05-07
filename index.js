const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const ejsMate = require("ejs-mate");
const { Listing, listingSchema } = require("./Model/listings.js");
require("dotenv").config();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const User = require("./Model/user.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

const ExpressError = require("./util/expressError");

const { Review, reviewSchema } = require("./Model/Review.js");

const wrapAsync = require("./util/wrapAsync");
app.engine("ejs", ejsMate);
const dbUrl = process.env.mongodbAtlas_Url;

const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 3600,
});
const Secret = process.env.SECRET;
const sessionOption = {
  store,
  secret: Secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
    maxAge: 1000 * 60 * 60 * 24 * 3,
    httpOnly: true,
  },
};

async function main() {
  let mongodbAtlas_url = dbUrl;
  await mongoose.connect(mongodbAtlas_url);
}
main()
  .then((res) => {
    console.log("Connesction Successfully Established with database");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.urlencoded({ extended: true }));
// app.use(session(sessionOption));
// app.use(flash());

// Passport Configure start
app.use(cookieParser("secretcode"));
app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

// console.log(typeof LocalStratergy);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Passport Configure end

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;

  next();
});

let port = 8080;

app.listen(8080, () => {
  console.log("Server is Listening on port 8080");
});

const listingRouter = require("./routes/listing.js");
app.use("/wanderlust", listingRouter);

const reviewRouter = require("./routes/review.js");
app.use("/wanderlust/review/:id", reviewRouter);

const authenticateRouter = require("./routes/authentication.js");
app.use("/wanderlust/authenticate", authenticateRouter);
app.use("/", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});
app.use((err, req, res, next) => {
  let { status = 500, message = "Something Went Wrong" } = err;
  //  console.dir(message);
  //  console.log(err);

  res.status(status).render("error.ejs", { message });
});
