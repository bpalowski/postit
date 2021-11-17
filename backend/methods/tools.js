const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token)

  console.log("line 4", req.session)

  if (!token) {
    return res.status(403).json({ error: 'A token is required for authorization' })
  }

  try {
    const decodeToken = jwt.verify(token, process.env.SECRET);
    if (!decodeToken) {
      errors.email = "Token failed";
      return res.status(404).json({ errors });
    } else {
      console.log("132", req.session.user)
      req.user = decodeToken;
      return next()
    }
  } catch (e) {
    return res.status(401).send("Invalid Token");
  }

}

module.exports = {
  verifyToken
}