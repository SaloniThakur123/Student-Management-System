const jwt = require("jsonwebtoken");

const secretKey = "dhfjdkjsz";

function checkAuth() {
  return (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return next();
    }
    try {
      const payload = jwt.verify(token, secretKey);
      req.user = {...payload};
      next();
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = checkAuth;
