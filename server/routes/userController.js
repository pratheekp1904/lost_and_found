const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/UserSchema");
require('dotenv').config();

const signup = async (req, res) => {
  try {
    const { username, rollno, email, password } = req.body;

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Create a user with the data
    const user = await User.create({
      username: username,
      rollno: rollno,
      email: email,
      password: hashedPassword
    });

    // Respond with the user data
    res.status(201).json({ user });
  } catch (error) {
    // Handle errors here
    console.log("Error during signup:", error);
    res.status(500).send("Internal Server Error");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    if (!process.env.SECRETKEY) {
      throw new Error('SECRETKEY environment variable is not defined');
    }
    const expirationTime = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign({ sub: user._id, expirationTime }, process.env.SECRETKEY);
    res.cookie("Authorization", token, {
      expires: new Date(expirationTime),
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === "production"
    });
    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: `Internal Server Error: ${error.message}` });
  }
};

const logout = (req, res) => {
  try {
    // clear cookie
    res.clearCookie("Authorization");
    res.sendStatus(200);
  } catch (error) {
    // Handle errors here
    console.error("Error during logout:", error);
    res.status(500).send("Internal Server Error");
  }
}

const fetchUser = async (req, res) => {
  try {
    // get id off the url
    const userId = req.params.id;

    // find the notes using that id
    const user = await User.findById(userId);

    // respond with them
    res.json({ gotUser: user });
  } catch (error) {
    // Handle errors here
    console.error("Error during fetchItem:", error);
    res.status(500).send("Internal Server Error");
  }
}

const checkAuth = (req, res) => {
  try {
    console.log(req.user);
    res.sendStatus(200);
  } catch (error) {
    // Handle errors here
    console.error("Error during checkAuth:", error);
    res.status(500).send("Internal Server Error");
  }
}


module.exports = {
  signup: signup,
  fetchUser:fetchUser,
  login: login,
  logout: logout,
  checkAuth: checkAuth
}
