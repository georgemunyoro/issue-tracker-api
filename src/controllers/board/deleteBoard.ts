import * as express from "express";
import { prisma } from "../../db/client";
import {
  handleRequestError,
  handleServerError,
  handleSuccessfulRequest,
  handleUnauthorizedUser,
} from "../../utils/requestHandlers";
import { getRequestAuthUser } from "../../utils/getRequestAuthUser";

export const deleteBoard = async (req: express.Request, res: express.Response) => {
  try {
    const [isUserAuthorized] = await getRequestAuthUser(req);
    if (!isUserAuthorized) return handleUnauthorizedUser(res);

    const boardToDelete = await prisma.board.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!boardToDelete) return handleRequestError(res, ["unable to delete board"]);

    const deletedBoard = await prisma.board.delete({ where: { id: req.params.id } });
    return handleSuccessfulRequest(res, {
      project: deletedBoard,
    });
  } catch (error) {
    handleServerError(res, [error]);
  }
};
