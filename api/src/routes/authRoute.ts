import { Router } from "express";

const routerAuth = Router();

routerAuth.get("/", (req, res) => {
  res.send("ahora le toca el turno a los usuarios");
});

export = routerAuth;
