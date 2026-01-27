export function registerPost(req, res) {
  //const { fullName, email, campus, password } = req.body;

  // TODO: save user into Firestore (or whatever DB you use)
  // For now, just log it
  console.log("New registration:", req.body);

  // Redirect to login or dashboard after registering
  res.redirect("/login");
}