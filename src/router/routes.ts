import { Router } from "express";
import { AuthController } from "../controller/AuthController";
import { UserController } from "../controller/UserController";
import { PeopleController } from "../controller/PeopleController";
import { AuthMiddlewares } from "../middleware/auth";

const userController = new UserController();
const authController = new AuthController();

const peopleController = new PeopleController();

export const router = Router();

router.get("/users", AuthMiddlewares, userController.index);
router.post("/create", userController.store);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

router.get("/peoples", peopleController.index);
router.post("/peoples", peopleController.store);
router.put("/peoples/:id", peopleController.update);
router.delete("/peoples/:id", peopleController.delete);

router.post("/auth", authController.authenticate);
