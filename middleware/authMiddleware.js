import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); 

  console.log('Received token:', token); 

  if (!token) {
    console.log('No token provided');
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    console.log('Decoded token:', decoded); 

    req.user = await User.findById(decoded._id); 

    if (!req.user) {
      console.log('User not found');
      return res.status(404).send('User not found');
    }

    console.log('User found:', req.user); 
    next(); 
  } catch (err) {
    console.error('Error during token verification:', err); 
    return res.status(400).send('Invalid token.');
  }
};

export default authMiddleware;
