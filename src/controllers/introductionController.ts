import { Request, Response } from 'express';
import { renderIntroduction } from '../views/introduction/index';

export const getIntroduction = (req: Request, res: Response) => {
  res.send(renderIntroduction());
};