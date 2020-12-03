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

export const getIssue = async (req: express.Request, res: express.Response) => {
  try {
    const [isUserAuthorized] = await getRequestAuthUser(req);
    if (!isUserAuthorized) handleUnauthorizedUser(res);

    const issue = await prisma.issue.findUnique({
      where: req.params,
    });

    if (!issue) handleRequestError(res, ["unable to retrieve issue"]);

    return handleSuccessfulRequest(res, {
      issue,
    });
  } catch (error) {
    handleServerError(res, [error]);
  }
};
