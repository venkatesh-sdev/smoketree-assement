// src/@types/express.d.ts
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: number; // or string, depending on your use case
    }
  }
}
