import { NextFunction } from 'express';
import { Response } from 'express';
import { Request } from 'express';


export function ensureAdmin(request: Request, response: Response, nextFunc: NextFunction) {
  const isAdmin = true;

  if (isAdmin) return nextFunc();

  return response.status(401).json({ error: "Unauthorized user" });

}