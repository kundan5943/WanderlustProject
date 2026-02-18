module.exports=(req,res,next)=>
{
  if(!req.isAuthenticated())
  {
    // console.log(req.originalUrl);
    req.session.redirectUrl=req.originalUrl;
    req.flash('error',"You must login first");
    return res.redirect('/wanderlust/authenticate/login');
  }
  next();
}

module.exports.savedUrl=(req,res,next)=>
{
  if(req.session.redirectUrl)
  {
    res.locals.redirectUrl= req.session.redirectUrl;
  }
  next();
}


 