
/*
 *  Generic require login routing middleware
 */
exports.removeSession = function(req, res,next) {
  console.log("ok");
}
exports.requiresLogin = function (req, res, next) {
  console.log(req);
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl
    res.statusCode = 401;
    return res.render();
    
  }
  next()
}

/*
 *  User authorization routing middleware
 */

exports.user = {
  hasAuthorization : function (req, res, next) {
    if (req.profile.id != req.user.id) {
      req.flash('info', 'You are not authorized')
      return res.redirect('/users/'+req.profile.id)
    }
    next()
  }
}

/*
 * Example protecting Articles (from another example) authorization routing middleware
 */

exports.snippet = {
  hasAuthorization : function (req, res, next) {
    if (req.snippet.user.id != req.user.id) {
      req.flash('info', 'You are not authorized')
      return res.redirect('/snipets/'+req.snippet.id)
    }
    next()
  }
}

