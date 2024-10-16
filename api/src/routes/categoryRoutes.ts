import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/categotyControl";

const routerCategories = Router();

routerCategories.get("/:id", getCategory);
routerCategories.get("/", getCategories);
routerCategories.post("/", createCategory);
routerCategories.put("/:id", updateCategory);
routerCategories.delete("/:id", deleteCategory);

export = routerCategories;
