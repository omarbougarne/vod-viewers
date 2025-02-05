
import { validateUser } from '../models/userModel.js';
import * as userService from '../services/userService.js';

export const registerUser = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error);
    const user = await userService.registerUser(req.body);
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    console.log(res.status(400).send(error));
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userService.loginUser(email, password);
    res.status(200).json(token);
  } catch (error) {
    console.log(error);
res.status(400).send(error.message);


  }
};
