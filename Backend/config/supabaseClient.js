import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
dotenv.config({ path: '../.env' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
console.log(supabaseUrl," url")
// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseKey);