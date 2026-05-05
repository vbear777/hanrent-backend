import express from "express";
import { getUserData, loginUser, registerUser } from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const useRouter = express.Router();

useRouter.post('/register', registerUser)
useRouter.post('/login', loginUser)
useRouter.get('/data', protect, getUserData)

export default useRouter;