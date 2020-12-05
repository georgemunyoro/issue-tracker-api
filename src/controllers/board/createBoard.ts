import * as express from "express";
import { prisma } from "../../db/client";
import {
  handleRequestError,
  handleServerError,
  handleSuccessfulRequest,
  handleUnauthorizedUser,
} from "../../utils/requestHandlers";
import { getRequestAuthUser } from "../../utils/getRequestAuthUser";

export const createBoard = async (req: express.Request, res: express.Response) => {
  try {
    const [isUserAuthorized, { authenticatedUser }] = await getRequestAuthUser(req);
    if (!isUserAuthorized) handleUnauthorizedUser(res);

    const { name, description, projectId } = req.body;

	const successfullyCreatedNewBoard = await prisma.project.update({
	  where: {
		id: projectId,
	  },
	  data: {
		boards: {
		  create: [{
			name,
			description,
		  }]
		}
	  }
	})

    if (!successfullyCreatedNewBoard) handleRequestError(res, ["unable to create board"]);

    return handleSuccessfulRequest(
      res,
      {
		board: {
		  name,
		  project: projectId,
		  description,
		},
      },
      201
    );
  } catch (error) {
    handleServerError(res, [error]);
  }
};
