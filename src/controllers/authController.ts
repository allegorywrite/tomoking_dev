import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../app';
import { renderLogin } from '../views/auth/login';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not set');
}

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword },
  });
  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET);
  res.json({ token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET);
  req.session.token = token;
  // req.session.role = user.role;
  // req.session.save();
  res.json({ token });
};

export const getLogin = (req: Request, res: Response) => {
    res.send(renderLogin());
};