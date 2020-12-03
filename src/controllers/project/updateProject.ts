import * as express from "express";
import { prisma } from "../../db/client";
import {
  handleRequestError,
  handleServerError,
  handleSuccessfulRequest,
  handleUnauthorizedUser,
} from "../../utils/requestHandlers";
import { getRequestAuthUser } from "../../utils/getRequestAuthUser";

export const updateProject = async (req: express.Request, res: express.Response) => {
  try {
    const [isUserAuthorized] = await getRequestAuthUser(req);
    if (!isUserAuthorized) handleUnauthorizedUser(res);

    const updatedProjct = await prisma.project.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });

    if (!updatedProjct) handleRequestError(res, ["Unable to update project"]);

    return handleSuccessfulRequest(res, {
      project: updatedProjct,
    });
  } catch (error) {
    handleServerError(res, [error]);
  }
};
