import * as userService from '../services/userService.js';

export const registerUser = async (req, res) => {
  const { 
    first_names, 
    surname, 
    email, 
    password, // <-- 1. Added password to the destructuring
    phone, 
    role, 
    campus_id, 
    gender, 
    race, 
    date_of_birth,
    github_user,
    passport_id 
  } = req.body;

  // 2. Updated validation to require password
  if (!email || !password || !first_names || !surname) {
    return res.status(400).json({ error: "Email, password, names, and surname are required" });
  }

  try {
    // 3. FIX: Changed 'createUser' to 'registerUserWithAuth' 
    // and passed the data + password
    const result = await userService.registerUserWithAuth({
      first_names,
      surname,
      email,
      phone,
      role: role || 'facilitator', 
      campus_id,
      gender,
      race,
      date_of_birth,
      github_user,
      passport_id
    }, password);

    return res.status(201).json({
      message: "User registered successfully",
      user: result.profile,
      auth: result.user
    });

  } catch (error) {
    if (error.code === '23505' || error.message?.includes('already registered')) {
      return res.status(409).json({ message: "A user with this email already exists" });
    }

    console.error("User Creation Error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const fetchAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const fetchUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required for login" });
  }
  try {
    const authData = await userService.loginUser(email, password);
    
    // 4. Return the session so the frontend gets the JWT token
    return res.status(200).json({
      message: "Login successful",
      user: authData.user,
      session: authData.session
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(401).json({ error: "Invalid credentials" });
  }
};