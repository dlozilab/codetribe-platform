import { supabase } from '../config/supabaseClient.js';

const authMiddleware = async (req, res, next) => {
  // 1. Get the token from the Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      error: "No token provided. Access denied." 
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 2. Verify the session with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      throw new Error("Invalid or expired token");
    }

    // 3. Attach the user to the request object for use in controllers
    req.user = user;
    
    // 4. Proceed to the next middleware/controller
    next();

  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    
    // Check if it's an API request or a Page request
    if (req.headers.accept?.includes('application/json')) {
        return res.status(401).json({ error: "Not Authorized" });
    }
    
    return res.status(401).render('system/notAuthorized');
  }
};

export default authMiddleware;