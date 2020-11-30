import * as express from "express";
import { prisma } from "../../db/client";
import { Issue } from "@prisma/client";
import { handleServerError } from "../../utils/errorHandling";
import { getRequestAuthUser } from "../../utils/getRequestAuthUser";

export const listIssues = async (
  req: express.Request,
  res: express.Response
) => {
  const [isUserAuthorized, author] = await getRequestAuthUser(req);

  try {
    if (!isUserAuthorized) {
      return res.status(400).json({
        success: false,
        data: {
          errors: ["User not logged in"],
        },
      });
    }

    const issues = await prisma.issue.findMany({
      where: req.params,
    });

    if (!issues) {
      return res.status(400).json({
        success: false,
        data: {
          errors: ["Unable to delete issue"],
        },
      });
    }

    issues.filter((issue: Issue) => issue.authorId == author.id);

    return res.status(200).json({
      success: true,
      data: {
        issues,
      },
    });
  } catch (error) {
    handleServerError(res, [error]);
  }
};
