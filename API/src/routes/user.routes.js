import { Router } from "express";
import { methods as userController } from "../controllers/user.controller";
import auth from "../middleware/authJwt";

const router = Router();

router.get("/test/user", [auth], userController.userBoard);
router.get("/all", userController.allAcces);

export default router;
