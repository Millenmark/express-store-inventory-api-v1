import { Router } from "express";

/** IMPORT: CONTROLLER */
import {
  showAllProducts,
  showAllProductsStatic,
} from "../controllers/productController.js";

const router = Router();

router.route("/").get(showAllProducts);
router.route("/static").get(showAllProductsStatic);

export default router;
