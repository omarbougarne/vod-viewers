
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

export const registerUser = async (userData) => {
  const { name, email, password } = userData;

  let user = await User.findOne({ email });
  if (user) {
    throw new Error('User already registered.');
  }
  
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  user = new User({
    name: name,
    email: email,
    password: hashedPassword
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
  if (!user) throw new Error('Invalid email or password.');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error('Invalid email or password.');

  const token = user.generateAuthToken();
  return { token };
};

const userService = { registerUser, loginUser };
export default userService;
