import { supabase } from '../config/supabaseClient.js';

// ✅ Correct: Handles both Auth account and Profile table
export const registerUserWithAuth = async (userData, password) => {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: userData.email,
    password: password,
  });

  if (authError) throw authError;

  const { data: profileData, error: profileError } = await supabase
    .from('users')
    .insert([{
      ...userData,
      id: authData.user.id 
    }])
    .select();

  if (profileError) throw profileError;
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