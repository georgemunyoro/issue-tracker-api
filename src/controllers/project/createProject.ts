import * as express from "express";
import { prisma } from "../../db/client";
import {
  handleRequestError,
  handleServerError,
  handleSuccessfulRequest,
  handleUnauthorizedUser,
} from "../../utils/requestHandlers";
import { getRequestAuthUser } from "../../utils/getRequestAuthUser";

export const createProject = async (req: express.Request, res: express.Response) => {
  try {
    const [isUserAuthorized, { authenticatedUser }] = await getRequestAuthUser(req);
    if (!isUserAuthorized) return handleUnauthorizedUser(res);

    const succesfullyCreatedProject = await prisma.user.update({
      where: {
        id: authenticatedUser.id,
      },
      data: {
        projects: {
          create: [{ name: req.body.name }],
        },
      },
      include: {
        projects: true,
      },
    });

    if (!succesfullyCreatedProject) return handleRequestError(res, ["unable to create project"]);

    return handleSuccessfulRequest(
      res,
      {
        project: succesfullyCreatedProject.projects.filter(
          (project: any) => project.name == req.body.name,
        )[0],
      },
      201,
    );
  } catch (error) {
    handleServerError(res, [error]);
  }
};
