const accessControl = (req, res, next) => {
  const access = true;
  if (!access) {
    res.status(401).json({
      success: false,
      message: "You are not authorized",
    });
  }
  console.log("Middleware : Access Control - authorized");
  next();
};
const secondMiddleware = (req, res, next) => {
  console.log("Second Middleware");
  next();
};
module.exports = {
  accessControl,
  secondMiddleware
};
