import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { validateDTO } from "../../infrastructure/middlewares/validateDTO";
import { createUserSchema, loginUserSchema } from "../../infrastructure/dtos/user.dto";
import { authMiddleware } from "../../infrastructure/middlewares/authMiddleware";

const router = Router();

router.post("/", validateDTO(createUserSchema), UserController.create);
router.post("/login", validateDTO(loginUserSchema), UserController.login);
router.get("/profile", authMiddleware, UserController.getProfile);

export default router;