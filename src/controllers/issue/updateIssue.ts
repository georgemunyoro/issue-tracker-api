import * as express from "express";
import { prisma } from "../../db/client";
import {
  handleRequestError,
  handleServerError,
  handleSuccessfulRequest,
  handleUnauthorizedUser,
} from "../../utils/requestHandlers";
import { getRequestAuthUser } from "../../utils/getRequestAuthUser";

export const updateIssue = async (req: express.Request, res: express.Response) => {
  const [isUserAuthorized, author] = await getRequestAuthUser(req);
  const issueId = req.params.issueId;

  try {
    if (!isUserAuthorized) handleUnauthorizedUser(res);

    const updatedIssue = await prisma.issue.update({
      where: {
        id: issueId,
      },
      data: req.body,
    });

    if (!updatedIssue) handleRequestError(res, ["unable to update issue"]);

    return handleSuccessfulRequest(res, {
      issue: updatedIssue,
    });
  } catch (error) {
    handleServerError(res, [error]);
  }
};
