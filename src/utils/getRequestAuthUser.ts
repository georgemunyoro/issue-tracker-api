import * as express from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../db/client";

export async function getRequestAuthUser(req: express.Request): Promise<[boolean, any]> {
  const token: any = req.header("X-Auth");
  try {
    const decoded: any = jwt.verify(token, process.env.SECRET!);
    const authenticatedUser = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    return [true, { authenticatedUser }];
  } catch (error) {
    return [false, error];
  }
}
