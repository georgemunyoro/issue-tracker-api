import * as express from "express";
import { prisma } from "../../db/client";
import {
  handleRequestError,
  handleServerError,
  handleSuccessfulRequest,
  handleUnauthorizedUser,
} from "../../utils/requestHandlers";
import { getRequestAuthUser } from "../../utils/getRequestAuthUser";

export const getProject = async (req: express.Request, res: express.Response) => {
  try {
    const [isUserAuthorized] = await getRequestAuthUser(req);
    if (!isUserAuthorized) handleUnauthorizedUser(res);

    const requestedProject = await prisma.project.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!requestedProject) handleRequestError(res, ["Unable to retrieve requested project"]);

    handleSuccessfulRequest(res, {
      project: requestedProject,
    });
  } catch (error) {
    handleServerError(res, [error]);
  }
};
