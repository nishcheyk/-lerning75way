import { Request, Response } from "express";
import * as userService from "./user.services";
import { validationResult } from "express-validator";


const validate = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return true;
  }
  return false;
};

export const register = async (req: Request, res: Response) => {
  if (validate(req, res)) return;

  try {
    const { email, password } = req.body;
    const user = await userService.createUser(email, password);
    res.status(201).json({ id: user._id, email: user.email });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  if (validate(req, res)) return;

  try {
    const { email, password } = req.body;
    const user = await userService.validateUser(email, password);
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

  
    res.json({
      message: "Login successful",
      userId: user._id,
      email: user.email,
   
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};


export const logout = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    return res.status(200).json({ message: "Logout successful" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
