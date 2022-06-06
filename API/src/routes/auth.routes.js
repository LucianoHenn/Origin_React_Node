import { Router } from "express";
import { methods as authController } from "../controllers/auth.controller";
import auth from "../middleware/authJwt";

const router = Router();

router.post("/register", authController.createNew);
router.post("/login", authController.login);
router.get("/isUserAuth", [auth], authController.isUserAuth);

export default router;
