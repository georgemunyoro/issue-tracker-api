import * as express from "express";
import { prisma } from "../../db/client";
import { Issue } from "@prisma/client";
import {
  handleRequestError,
  handleServerError,
  handleSuccessfulRequest,
  handleUnauthorizedUser,
} from "../../utils/requestHandlers";
import { getRequestAuthUser } from "../../utils/getRequestAuthUser";

export const listIssues = async (req: express.Request, res: express.Response) => {
  try {
    const [isUserAuthorized, author] = await getRequestAuthUser(req);
    if (!isUserAuthorized) handleUnauthorizedUser(res);

    const issues = await prisma.issue.findMany({
      where: req.params,
    });

    if (!issues) handleRequestError(res, ["unable to retrieve issues"]);

    return handleSuccessfulRequest(res, {
      issues: issues.filter((issue: Issue) => issue.authorId == author.id),
    });
  } catch (error) {
    handleServerError(res, [error]);
  }
};
