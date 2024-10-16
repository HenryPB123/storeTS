import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productsControl";

const routerProducts = Router();

routerProducts.get("/:id", getProduct);
routerProducts.get("/", getProducts);
routerProducts.post("/", createProduct);
routerProducts.put("/:id", updateProduct);
routerProducts.delete("/:id", deleteProduct);

export = routerProducts;
