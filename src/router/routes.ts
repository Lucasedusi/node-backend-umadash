import { Router } from "express";
import { AuthController } from "../controller/AuthController";
import { UserController } from "../controller/UserController";
import { AuthMiddlewares } from "../middleware/auth";

const userController = new UserController();
const authController = new AuthController();

export const router = Router();

router.get("/users", AuthMiddlewares, userController.index);
router.post("/create", userController.store);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

router.post("/auth", authController.authenticate);
