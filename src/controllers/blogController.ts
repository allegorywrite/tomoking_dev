import { Request, Response } from 'express';
import { prisma } from '../app';
import { renderLanding } from '../views/blog/landing';
import { renderPost } from '../views/blog/post';
import { renderEditPost } from '../views/blog/editPost';
import { renderCreatePost } from '../views/blog/createPost';
import { AuthRequest } from '../middlewares/authMiddleware';
import { Post, User, Prisma } from '@prisma/client';

export const getLanding = async (req: AuthRequest, res: Response) => {
  const posts = await prisma.post.findMany();
  res.send(renderLanding(posts, req.authenticated));
};

export const getPost = async (req: AuthRequest, res: Response) => {
  const post = await prisma.post.findFirst({
    where: { title: req.params.title },
  });
  if (post) {
    res.send(renderPost(post, req.authenticated));
  } else {
    res.status(404).send('記事が見つかりませんでした。');
  }
};

// export const getEditPost = async (req: AuthRequest, res: Response) => {
//   const post = await prisma.post.findFirst({
//     where: { title: req.params.title },
//     include: { author: true },
//   });

//   if (post && post.author && post.author.id === req.userId) {
//     res.send(renderEditPost(post));
//   } else {
//     res.status(404).send('記事が見つかりませんでした。');
//   }
// };

export const getEditPost = async (req: AuthRequest, res: Response) => {
  const post = await prisma.post.findFirst({
    where: { title: req.params.title },
  });

  if (post && req.authenticated) {
    res.send(renderEditPost(post));
  } else {
    res.status(404).send('記事が見つかりませんでした。');
  }
};

export const createPost = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const post = await prisma.post.create({
    data: { title, content },
  });
  res.json(post);
};

export const updatePost = async (req: Request, res: Response) => {
  const { postId, title, content } = req.body;
  const post = await prisma.post.update({
    where: { id: Number(postId) },
    data: { title, content },
  });
  res.json(post);
};

export const getCreatePost = (req: Request, res: Response) => {
  res.send(renderCreatePost());
};