import { Router } from "express";
import { getCategories } from "../controllers/categotyControl";
import routerProducts from "./productRoutes";

const router = Router();

router.use("/products", routerProducts);
router.use("/categories", getCategories);

export default router;
