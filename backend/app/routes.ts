// Common utilities and types can go here import { Router } from 'express';
import userRoutes from './user/user.routes';
import express from "express";
const router = express.Router();

router.use('/auth', userRoutes);

export default router; 