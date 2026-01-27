// middleware/authMiddleware.js

const authMiddleware = (req, res, next) => {
  // TEMP: Allow everything through for now
  const isAuthenticated = true;

  if (isAuthenticated) {
    return next();
  } else {
    return res.status(401).render('system/notAuthorized'); // or send JSON if API
  }
};

export default authMiddleware;
