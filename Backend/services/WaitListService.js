import { supabase } from '../config/supabaseClient.js';

/**
 * Service to handle database operations for the waitlist
 */
export const insertWaitlistEntry = async (waitlistData) => {
  const { data, error } = await supabase
    .from('waiting_list')
    .insert([waitlistData])
    .select();

  if (error) {
    throw error;
  }

  return data[0];
};

export const getWaitlistEntries = async () => {
  const { data, error } = await supabase
    .from('waiting_list')
    .select('*');

  if (error) {
    throw error;
  }

  return data;
};