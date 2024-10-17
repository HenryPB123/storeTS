import { Router } from "express";
import routerProducts from "./productRoutes";
import routerCategories from "./categoryRoutes";
import routerAuth from "./authRoute";

const router = Router();

router.use("/products", routerProducts);
router.use("/categories", routerCategories);
router.use("/auth", routerAuth);

export default router;
