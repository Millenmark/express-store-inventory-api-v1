import { Router } from "express";

/** IMPORT: CONTROLLER */
import { showAllProducts } from "../controllers/productController.js";

const router = Router();

router.route("/").get(showAllProducts);

export default router;
