import * as express from "express";
import { prisma } from "../../db/client";
import {
  handleRequestError,
  handleServerError,
  handleSuccessfulRequest,
  handleUnauthorizedUser,
} from "../../utils/requestHandlers";
import { getRequestAuthUser } from "../../utils/getRequestAuthUser";

export const updateBoard = async (req: express.Request, res: express.Response) => {
  try {
    const [isUserAuthorized] = await getRequestAuthUser(req);

    if (!isUserAuthorized) handleUnauthorizedUser(res);

    const updatedBoard = await prisma.board.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });

    if (!updatedBoard) handleRequestError(res, ["unable to update board"]);

    return handleSuccessfulRequest(res, {
      board: updatedBoard,
    });
  } catch (error) {
    handleServerError(res, [error]);
  }
};
