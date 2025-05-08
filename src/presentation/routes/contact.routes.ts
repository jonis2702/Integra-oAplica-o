import { Router } from "express";
import { ContactController } from "../controllers/contact.controller";
import { validateDTO } from "../../infrastructure/middlewares/validateDTO";
import { createContactSchema } from "../../infrastructure/dtos/contact.dto";
import { authMiddleware } from "../../infrastructure/middlewares/authMiddleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validateDTO(createContactSchema),
  ContactController.create
);

export default router;