import {supabase} from '../config/supabaseClient.js';

export const addToWaitlist = async (req, res) => {
  console.log("Waitlist controller",req.body)
  // const { project, email, name, google_id, img_url, source } = req.body;

  // // Basic Validation
  // if (!email || !project) {
  //   return res.status(400).json({ error: "Email and Project ID are required." });
  // }

  // try {
  //   // 1. Insert into 'waiting_list' table
  //   const { data, error } = await supabase
  //     .from('waiting_list')
  //     .insert([
  //       {
  //         project: project,
  //         email: email,
  //         name: name,
  //         google_id: google_id,
  //         img_url: img_url,
  //         source: source
  //       }
  //     ])
  //     .select();

  //   if (error) {
  //     // Check for Unique Constraint Violation (Duplicate Entry)
  //     if (error.code === '23505' || error.message.includes('unique')) {
  //       return res.status(409).json({ message: "User already on the list" });
  //     }
  //     throw error;
  //   }

  //   res.status(201).json({ 
  //     message: "Successfully added to waitlist", 
  //     entry: data[0] 
  //   });

  // } catch (error) {
  //   console.error("Waitlist Error:", error.message);
  //   res.status(500).json({ error: "Server error processing waitlist" });
  // }
};