import * as express from "express";
import { prisma } from "../../db/client";
import {
  handleRequestError,
  handleServerError,
  handleSuccessfulRequest,
  handleUnauthorizedUser,
} from "../../utils/requestHandlers";
import { getRequestAuthUser } from "../../utils/getRequestAuthUser";

export const deleteIssue = async (req: express.Request, res: express.Response) => {
  try {
    const [isUserAuthorized] = await getRequestAuthUser(req);
    if (!isUserAuthorized) return handleUnauthorizedUser(res);

    const issueId = req.params.issueId;
    const issueToDelete = await prisma.issue.findUnique({
      where: {
        id: issueId,
      },
    });

    if (!issueToDelete) return handleRequestError(res, ["unable to delete issue"]);

    const deletedIssue = await prisma.issue.delete({ where: { id: issueId } });
    return handleSuccessfulRequest(res, {
      project: deletedIssue,
    });
  } catch (error) {
    handleServerError(res, [error]);
  }
};
