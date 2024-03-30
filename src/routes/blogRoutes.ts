import express from 'express';
import { getLanding, getPost, createPost, getCreatePost, getEditPost, updatePost } from '../controllers/blogController';
import { authMiddleware, authSessionMiddleware, checkSessionMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/ja/', checkSessionMiddleware, getLanding);
router.get('/ja/posts/create', getCreatePost);
router.get('/ja/posts/:title/edit', authSessionMiddleware, getEditPost);
router.get('/ja/posts/:title/', checkSessionMiddleware, getPost);
router.put('/ja/posts/:title/', authMiddleware, updatePost);
router.post('/ja/posts/', authMiddleware, createPost);

export default router;