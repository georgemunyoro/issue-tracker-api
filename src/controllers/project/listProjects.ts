import * as express from "express";
import { prisma } from "../../db/client";
import {
  handleRequestError,
  handleServerError,
  handleSuccessfulRequest,
  handleUnauthorizedUser,
} from "../../utils/requestHandlers";
import { getRequestAuthUser } from "../../utils/getRequestAuthUser";

export const listProjects = async (req: express.Request, res: express.Response) => {
  try {
    const [isUserAuthorized, { authenticatedUser }] = await getRequestAuthUser(req);
    if (!isUserAuthorized) handleUnauthorizedUser(res);

    const requestedProjects = await prisma.project.findMany({
      where: req.body,
    });

    if (!requestedProjects) handleRequestError(res, ["unable to retrieve projects"]);

    return handleSuccessfulRequest(res, {
      projects: requestedProjects.filter((project) => project.ownerId == authenticatedUser.id),
    });
  } catch (error) {
    handleServerError(res, [error]);
  }
};
