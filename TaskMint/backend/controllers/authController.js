const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

exports.signup = async (req, res) => {
  const { username, email, number, password } = req.body;
  if (!username || !email || !number || !password) {
    return res.status(400).send("All fields are required");
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const createdUser = await userModel.create({
      username,
      email,
      password: hash,
      mobile_number: number,
    });
    const token = jwt.sign({ email, username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true });
    res.status(201).send(createdUser);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

exports.login = async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }
    const result = await bcrypt.compare(req.body.password, user.password);
    if (result) {
      let token = jwt.sign({ email: user.email, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.cookie("token", token, { httpOnly: true });
      res.send("Login successful");
    } else {
      res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

exports.dashboard = (req, res) => {
  res.send(`Welcome to your dashboard, ${req.user.email}!`);
};

exports.logout = (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.send("Logged out successfully");
};
