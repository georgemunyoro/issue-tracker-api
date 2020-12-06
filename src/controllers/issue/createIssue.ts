import * as express from "express";
import { prisma } from "../../db/client";
import {
  handleRequestError,
  handleServerError,
  handleSuccessfulRequest,
  handleUnauthorizedUser,
} from "../../utils/requestHandlers";
import { getRequestAuthUser } from "../../utils/getRequestAuthUser";

export const createIssue = async (req: express.Request, res: express.Response) => {
  try {
    const [isUserAuthorized, author] = await getRequestAuthUser(req);
    if (!isUserAuthorized) handleUnauthorizedUser(res);

    const { title, description, board, project, column } = req.body;
    const newIssue = await prisma.issue.create({
      data: {
        author,
        project,
        title,
        description,
        board,
        column,
      },
    });

	await prisma.project.update({
	  where: {
		id: project
	  },
	  data: {
		issues: {
		  connect: {
			id: newIssue.id
		  }
		}
	  }
	})

    if (!newIssue) handleRequestError(res, ["unable to create issue"]);

    return handleSuccessfulRequest(
      res,
      {
        project: newIssue,
      },
      201
    );
  } catch (error) {
    handleServerError(res, [error]);
  }
};
