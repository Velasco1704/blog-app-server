import { Request, Response } from "express";
import { prisma } from "../lib";

export const getPosts = async (req: Request, res: Response) => {
  try {
    return await prisma.post
      .findMany()
      .then((response) => res.json({ result: response }));
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const foundPost = await prisma.post.findFirst({
      where: { id: req.params.id },
      include: { user: true },
    });
    if (!foundPost) return res.status(404).json({ error: "post not found" });
    else return res.status(200).json({ result: foundPost });
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    return await prisma.post
      .create({ data: req.body })
      .then((response) => res.status(200).json({ result: response }))
      .catch(() => res.status(403).json({ error: "Invalid Credentials" }));
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    return await prisma.post
      .update({
        where: { id: req.params.id },
        data: req.body,
      })
      .then((response) => res.status(200).json({ result: response }))
      .catch(() => res.status(403).json({ error: "Invalid Credentials" }));
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    return await prisma.post
      .delete({ where: { id: req.params.id } })
      .then(() => res.status(200).json({ message: "SUCCESS" }))
      .catch(() => res.status(404).json({ error: "Invalid Credentials" }));
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
  }
};
