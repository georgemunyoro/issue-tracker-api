// @ts-nocheck
import * as express from "express";
import { prisma } from "../../db/client";
import {
  handleRequestError,
  handleServerError,
  handleSuccessfulRequest,
  handleUnauthorizedUser,
} from "../../utils/requestHandlers";
import { getRequestAuthUser } from "../../utils/getRequestAuthUser";

export const createColumn = async (req: express.Request, res: express.Response) => {
  try {
    const [isUserAuthorized] = await getRequestAuthUser(req);
    if (!isUserAuthorized) return handleUnauthorizedUser(res);

    const board = await prisma.board.findUnique({
      where: {
        id: req.body.board,
      },
      include: {
        columns: true,
      },
    });

    const succesfullyCreatedColumn = await prisma.board.update({
      where: {
        id: req.body.board,
      },
      data: {
        columns: {
          create: [
            {
              name: req.body.name,
            },
          ],
        },
      },
      include: {
        columns: true,
      },
    });

    const lastCreatedColumn = succesfullyCreatedColumn.columns
      .sort((x: any, y: any) => new Date(x).getTime() - new Date(y).getTime())
      .pop();

    await prisma.board.update({
      where: {
        id: req.body.board,
      },
      data: {
        columnLayout: [...board.columnLayout, lastCreatedColumn],
      },
    });

    await prisma.project.update({
      where: {
        id: board?.projectId,
      },
      data: {
        columns: {
          connect: {
            id: lastCreatedColumn!.id,
          },
        },
      },
    });

    if (!succesfullyCreatedColumn) return handleRequestError(res, ["unable to create column"]);

    return handleSuccessfulRequest(
      res,
      {
        column: lastCreatedColumn,
      },
      201,
    );
  } catch (error) {
    handleServerError(res, [error]);
  }
};
