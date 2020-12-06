import * as express from "express";
import { prisma } from "../../db/client";
import {
  handleRequestError,
  handleServerError,
  handleSuccessfulRequest,
  handleUnauthorizedUser,
} from "../../utils/requestHandlers";
import { getRequestAuthUser } from "../../utils/getRequestAuthUser";

export const getColumn = async (req: express.Request, res: express.Response) => {
  try {
    const [isUserAuthorized] = await getRequestAuthUser(req);
    if (!isUserAuthorized) handleUnauthorizedUser(res);

    const requestedColumn = await prisma.column.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!requestedColumn) handleRequestError(res, ["Unable to retrieve requested column"]);

    handleSuccessfulRequest(res, {
      column: requestedColumn,
    });
  } catch (error) {
    handleServerError(res, [error]);
  }
};
