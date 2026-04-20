import { supabase } from '../config/supabaseClient.js';

// ✅ Correct: Handles both Auth account and Profile table
export const registerUserWithAuth = async (userData, password) => {
  // 1. Create Auth User
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: userData.email,
    password: password,
  });

  if (authError) throw authError;

  // 2. Prepare CLEAN data for the table (only fields that exist in your DB)
  const cleanProfile = {
    id: authData.user.id, // The link
    first_names: userData.first_names,
    surname: userData.surname,
    email: userData.email,
    phone: userData.phone,
    role: userData.role,
    campus_id: userData.campus_id,
    gender: userData.gender,
    race: userData.race,
    date_of_birth: userData.date_of_birth,
    github_user: userData.github_user,
    passport_id: userData.passport_id
  };

  // 3. Insert into public.users
  const { data: profileData, error: profileError } = await supabase
    .from('users')
    .insert([cleanProfile])
    .select();

  if (profileError) {
    // If the table insert fails, we should know why!
    console.error("Profile Table Insert Error:", profileError.message);
    throw profileError;
  }

  return { user: authData.user, profile: profileData[0] };
};

// ✅ Correct: Uses Supabase Auth to verify credentials
export const loginUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data; // Returns { user, session }
};

export const getAllUsers = async () => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) throw error;
  return data;
};

export const getUserById = async (id) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};