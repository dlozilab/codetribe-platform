import * as waitlistService from '../services/WaitListService.js';

export const addToWaitlist = async (req, res) => {
  console.log("Waitlist controller", req.body);
  const { programme_name, email, name, google_id, img_url, source } = req.body;

  // Basic Validation
  if (!email || !programme_name) {
    return res.status(400).json({ error: "Email and Programme Name are required." });
  }

  try {
    // Call the service
    const entry = await waitlistService.insertWaitlistEntry({
      programme_name,
      email,
      name,
      google_id,
      img_url,
      source
    });

    return res.status(201).json({
      message: "Successfully added to waitlist",
      entry
    });

  } catch (error) {
    // Check for Unique Constraint Violation (Duplicate Entry) 
    // PostgreSQL error code 23505 is for unique_violation
    if (error.code === '23505' || (error.message && error.message.includes('unique'))) {
      return res.status(409).json({ message: "User already on the list" });
    }

    console.error("Waitlist Error:", error.message);
    return res.status(500).json({ error: "Server error processing waitlist" });
  }
};