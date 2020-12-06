import * as express from "express";
import { prisma } from "../../db/client";
import { Board } from "@prisma/client";
import {
  handleRequestError,
  handleServerError,
  handleSuccessfulRequest,
  handleUnauthorizedUser,
} from "../../utils/requestHandlers";
import { getRequestAuthUser } from "../../utils/getRequestAuthUser";

export const deleteColumn = async (req: express.Request, res: express.Response) => {
  try {
    const [isUserAuthorized] = await getRequestAuthUser(req);
    if (!isUserAuthorized) handleUnauthorizedUser(res);

    const column = await prisma.column.findUnique({
      where: { id: req.params.id },
    });

    if (column != null) {
      const board: Board | null = await prisma.board.findUnique({ where: { id: column.boardId } });

	  // @ts-ignore
      if (board.columnLayout != null) {
        await prisma.board.update({
          where: {
            id: column.boardId,
          },
          data: {
            columns: {
              delete: {
                id: req.params.id,
              },
            },
            // @ts-ignore
            columnLayout: board.columnLayout.filter(
              (col: any) => col.id != req.params.id && col.id != null,
            ),
          },
          include: {
            columns: true,
          },
        });

        return handleSuccessfulRequest(res, column);
      }
    }

    return handleRequestError(res, ["unable to delete column"]);
  } catch (error) {
    return handleServerError(res, [error]);
  }
};
