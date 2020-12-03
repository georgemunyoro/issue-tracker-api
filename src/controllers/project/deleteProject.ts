import * as express from "express";
import { prisma } from "../../db/client";
import {
  handleRequestError,
  handleServerError,
  handleSuccessfulRequest,
  handleUnauthorizedUser,
} from "../../utils/requestHandlers";
import { getRequestAuthUser } from "../../utils/getRequestAuthUser";

export const deleteProject = async (req: express.Request, res: express.Response) => {
  try {
    const [isUserAuthorized, authedUser] = await getRequestAuthUser(req);
    if (!isUserAuthorized) handleUnauthorizedUser(res);

    const projectExists = await prisma.project.findUnique({
      where: { id: req.params.id, name_ownerId: authedUser.id },
    });

    if (projectExists) {
      const deletedProject = await prisma.project.delete({
        where: {
          id: req.params.id,
        },
      });

      handleSuccessfulRequest(res, deletedProject);
    }

    handleRequestError(res, ["unable to delete project"]);
  } catch (error) {
    handleServerError(res, [error]);
  }
};
