import { compare, hash } from "bcrypt";
import { Request, Response } from "express";
import { prisma } from "../lib";
import { tokenSign } from "../helpers";

export const getUser = async (req: Request, res: Response) => {
  try {
    const foundUser = await prisma.user.findFirst({
      where: { id: req.params.id },
      include: { posts: true },
    });
    if (!foundUser) return res.status(404).json({ message: "user not found" });

    return res.status(200).json({ data: foundUser });
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const foundUser = await prisma.user.findFirst({
      where: { email: req.body.email },
    });
    if (!foundUser) return res.status(404).json({ message: "User not found" });
    return await compare(`${req.body.password}`, foundUser.password).then(
      async (result) => {
        const tokenSession = await tokenSign(foundUser);
        if (result)
          return res.status(200).json({
            data: {
              id: foundUser.id,
              email: foundUser.email,
            },
            token: tokenSession,
          });
        else return res.status(403).json({ error: "Invalid Credentials" });
      }
    );
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const passwordHashed = await hash(`${req.body.password}`, 8);
    const newUser = await {
      ...req.body,
      password: passwordHashed,
    };
    return prisma.user
      .create({ data: newUser })
      .then((response) => res.status(200).json({ data: response }));
  } catch (error) {
    if (error instanceof Error)
      return res.status(400).json({ error: error.message });
  }
};
