import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface AuthRequest extends Request {
  userId?: number;
  role?: string;
  authenticated?: boolean;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    // return res.status(401).json({ message: 'Authentication required' });
    return res.redirect('/auth/login');
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const authSessionMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.session.token;
  if (!token) {
    return res.redirect('/auth/login');
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    req.userId = decoded.userId;
    req.authenticated = true;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const checkSessionMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.session.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
            req.userId = decoded.userId;
            req.authenticated = true;
          } catch (error) {
            req.authenticated = false;
          }   
    }
    next();
  };
// export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     if (req.session.userId) {
//       next();
//     } else {
//       res.redirect('/auth/login');
//     }
//   };

// export const isAdmin = (token: string) => {
//   const decoded = jwt.verify(token, JWT_SECRET) as { userId: number, role: string };
//   return decoded.role === 'admin';
// };

