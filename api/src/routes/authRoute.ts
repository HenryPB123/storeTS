import { Router } from "express";
import { login, logout, register } from "../controllers/authControl";

const routerAuth = Router();

routerAuth.get("/register", register);
routerAuth.get("/login", login);
routerAuth.get("/logout", logout);

export = routerAuth;
