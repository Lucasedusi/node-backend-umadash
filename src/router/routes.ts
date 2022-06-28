import { Router } from "express";

import { AuthMiddlewares } from "../middleware/auth";

import { AuthController } from "../controllers/AuthController";
import { UserController } from "../controllers/UserController";
import { PeopleController } from "../controllers/PeopleController";
import { EventController } from "../controllers/EventController";

const userController = new UserController();
const authController = new AuthController();

const peopleController = new PeopleController();
const eventController = new EventController();

export const router = Router();

router.get("/users", AuthMiddlewares, userController.index);
router.post("/create", userController.store);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

router.get("/peoples", peopleController.index);
router.post("/peoples", peopleController.store);
router.put("/peoples/:id", peopleController.update);
router.delete("/peoples/:id", peopleController.delete);

router.get("/events", eventController.index);
router.post("/events", eventController.store);

router.post("/auth", authController.authenticate);
