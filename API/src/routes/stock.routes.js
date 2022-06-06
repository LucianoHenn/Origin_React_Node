import { Router } from "express";
import { methods as stockContoller } from "../controllers/stock.controller";
import auth from "../middleware/authJwt";

const router = Router();

router.get("/:id", auth, stockContoller.getAll);
router.post("/:id", auth, stockContoller.addStock);
router.delete("/:id", auth, stockContoller.deleteStock);

export default router;
