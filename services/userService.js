
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

export const registerUser = async (userData) => {
  const { name, email, password, role='user' } = userData;

  let user = await User.findOne({ email });
  if (user) {
    throw new Error('User already registered.');
  }
  if (role === 'admin') {
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      return res.status(400).send('Only one admin can exist.');
    }
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  user = new User({
    name: name,
    email: email,
    password: hashedPassword,
    role
  });

  await user.save();

  return {
    _id: user._id,
    name: user.name,
    email: user.email
  };
};

export const loginUser = async (email, password) => {
  let user = await User.findOne({ email });

  if (!user) {
    console.log("❌ No user found for:", email);
    throw new Error("Invalid email or password.");
  }

  console.log("🔹 User Found:", user);

  const validPassword = await bcrypt.compare(password, user.password);
  console.log("🔹 Password Check:", validPassword);

  if (!validPassword) {
    console.log("❌ Password mismatch");
    throw new Error("Invalid email or password.");
  }

  if (!user.generateAuthToken) {
    console.log("❌ generateAuthToken() is missing in User model!");
  }

  const token = user.generateAuthToken();
  console.log("✅ Login successful, token generated!");
  return { token };
};


const userService = { registerUser, loginUser };
export default userService;
