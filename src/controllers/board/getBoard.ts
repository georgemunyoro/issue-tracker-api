import * as express from "express";
import { prisma } from "../../db/client";
import {
  handleRequestError,
  handleServerError,
  handleSuccessfulRequest,
  handleUnauthorizedUser,
} from "../../utils/requestHandlers";
import { getRequestAuthUser } from "../../utils/getRequestAuthUser";

export const getBoard = async (req: express.Request, res: express.Response) => {
  try {
    const [isUserAuthorized] = await getRequestAuthUser(req);
    if (!isUserAuthorized) handleUnauthorizedUser(res);

    const board = await prisma.board.findUnique({
      where: req.params,
    });

    if (!board) handleRequestError(res, ["unable to retrieve board"]);

    return handleSuccessfulRequest(res, {
      board,
    });
  } catch (error) {
    handleServerError(res, [error]);
  }
};
