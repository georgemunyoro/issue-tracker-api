import * as express from "express";
import { prisma } from "../../db/client";
import {
  handleRequestError,
  handleServerError,
  handleSuccessfulRequest,
  handleUnauthorizedUser,
} from "../../utils/requestHandlers";
import { getRequestAuthUser } from "../../utils/getRequestAuthUser";

export const updateColumn = async (req: express.Request, res: express.Response) => {
  try {
    const [isUserAuthorized] = await getRequestAuthUser(req);
    if (!isUserAuthorized) handleUnauthorizedUser(res);

    const updatedProject = await prisma.column.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });

    if (!updatedProject) handleRequestError(res, ["Unable to update column"]);

    return handleSuccessfulRequest(res, {
      column: updatedProject,
    });
  } catch (error) {
    handleServerError(res, [error]);
  }
};
