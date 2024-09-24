
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];
  console.log(token);
  if (!token) return res.sendStatus(403);

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: any, decoded: any) => {
      if (err) return res.sendStatus(403);
      req.userId = (decoded as { id: number }).id; // Ensure this casting is correct
      next();
    }
  );
};
