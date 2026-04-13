import * as userService from '../services/userService.js';

export const registerUser = async (req, res) => {
  const { 
    first_names, 
    surname, 
    email, 
    phone, 
    role, 
    campus_id, 
    gender, 
    race, 
    date_of_birth,
    github_user,
    passport_id 
  } = req.body;

  // Basic validation for required fields
  if (!email || !first_names || !surname) {
    return res.status(400).json({ error: "Missing required fields (email, names, or surname)" });
  }

  try {
    const newUser = await userService.createUser({
      first_names,
      surname,
      email,
      phone,
      role: role || 'facilitator', // Defaulting to facilitator if not provided
      campus_id,
      gender,
      race,
      date_of_birth,
      github_user,
      passport_id
    });

    return res.status(201).json({
      message: "User created successfully",
      user: newUser
    });

  } catch (error) {
    // Handle duplicate emails (Postgres error 23505)
    if (error.code === '23505') {
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