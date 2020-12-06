import * as express from "express";
import { prisma } from "../../db/client";
import {
  handleRequestError,
  handleServerError,
  handleSuccessfulRequest,
  handleUnauthorizedUser,
} from "../../utils/requestHandlers";
import { getRequestAuthUser } from "../../utils/getRequestAuthUser";

export const listColumns = async (req: express.Request, res: express.Response) => {
  try {
    const [isUserAuthorized] = await getRequestAuthUser(req);
    if (!isUserAuthorized) handleUnauthorizedUser(res);

    const requestedColumns = await prisma.column.findMany({
      where: req.body,
    });

    if (!requestedColumns) handleRequestError(res, ["unable to retrieve columns"]);

    return handleSuccessfulRequest(res, {
      columns: requestedColumns,
    });
  } catch (error) {
    handleServerError(res, [error]);
  }
};
