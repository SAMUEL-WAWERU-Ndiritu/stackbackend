import jwt, { Secret, GetPublicKeyOrSecret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { responseHandler } from '../helpers';

interface User {
  id: number;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res
      .status(401)
      .json(responseHandler(false, 401, 'No token, authorization denied', null));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret | GetPublicKeyOrSecret) as unknown as { user: User };
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(401)
      .json(responseHandler(false, 401, 'Token is not valid', null));
  }
};
