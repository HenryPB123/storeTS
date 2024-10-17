import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddlewar = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];
  try {
    if (!token)
      res
        .status(401)
        .json({ message: "No se proporcionó un token, acceso denegado" });
    else {
      const verified = jwt.verify(token, process.env.JWT_SECRET as string);
      (req as any).user = verified;
      next();
    }
  } catch (error) {
    res.status(400).json({ message: "Token inválido" });
  }
};

export default authMiddlewar;
