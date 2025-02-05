import { User } from '../models/userModel.js';

const roleMiddleware = (requiredRole) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).send('Access denied. No token provided.');
    }

    if (req.user.role !== requiredRole) {
  return res.status(403).send('Route restricted');
}


    // Check for admin role and ensure only one admin exists
    if (requiredRole === 'admin') {
      const existingAdmin = await User.findOne({ role: 'admin' });
      if (existingAdmin && req.user._id.toString() !== existingAdmin._id.toString()) {
        return res.status(403).send('There is already an admin.');
      }
    }

    next(); // Allow the request to proceed
  };
};

export default roleMiddleware;
