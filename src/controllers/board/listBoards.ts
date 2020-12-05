import * as express from "express";
import { prisma } from "../../db/client";
import { Issue } from "@prisma/client";
import {
  handleRequestError,
  handleServerError,
  handleSuccessfulRequest,
  handleUnauthorizedUser,
} from "../../utils/requestHandlers";
import { getRequestAuthUser } from "../../utils/getRequestAuthUser";

export const listBoard = async (req: express.Request, res: express.Response) => {
  try {
    const [isUserAuthorized, author] = await getRequestAuthUser(req);
    if (!isUserAuthorized) handleUnauthorizedUser(res);

    const boards = await prisma.board.findMany({
      where: req.params,
    });

    if (!boards) handleRequestError(res, ["unable to retrieve boards"]);

    return handleSuccessfulRequest(res, {
      boards,
    });
  } catch (error) {
    handleServerError(res, [error]);
  }
};
