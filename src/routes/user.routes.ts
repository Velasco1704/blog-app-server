import { Router } from "express";
import { register, getUser, login } from "../controllers/user.controller";

const router = Router();

router.get("/user/:id", getUser);
router.post("/register", register);
router.post("/login", login);

export default router;
