import express from 'express';
import { getIntroduction } from '../controllers/introductionController';

const router = express.Router();

router.get('/', getIntroduction);

export default router;