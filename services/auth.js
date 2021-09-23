module.exports = () => {
  const isUserAuthenticated = (req, res, next) => {
    console.log("here");
    if (req.user) {
      next();
    } else {
      res.send("You must login!");
    }
  };
};
