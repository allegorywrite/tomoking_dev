import express from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import blogRoutes from './routes/blogRoutes';
import introductionRoutes from './routes/introductionRoutes';
import authRoutes from './routes/authRoutes';
import session from 'express-session';
// import * as session from 'express-session';
// const session = require('express-session');
// import './types/session';

declare module 'express-session' {
    interface SessionData {
      token?: string;
    }
  }

const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) {
  throw new Error('SESSION_SECRET is not set');
}

const app = express();
export const prisma = new PrismaClient();

app.use(bodyParser.json());

app.use(
    session({
      secret: SESSION_SECRET,
      name: 'session',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }
    })
  );

app.use('/', introductionRoutes);
app.use('/blog', blogRoutes);
app.use('/auth', authRoutes);

  

export default app;