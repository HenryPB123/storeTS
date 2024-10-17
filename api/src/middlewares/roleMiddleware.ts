import { Request, Response, NextFunction } from "express";

const roleMiddlewar = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user;
      if (!user) res.status(401).json({ message: "Unauthenticade user!!" });
      if (user.role !== requiredRole) {
        return res
          .status(403)
          .json({ message: "No tienes permisos para acceder a este recurso" });
      }

      next();
    } catch (error) {
      console.log(error);
    }
  };
};

export default roleMiddlewar;
