import * as express from "express";
import { prisma } from "../../db/client";
import { handleServerError } from "../../utils/errorHandling";
import { getRequestAuthUser } from "../../utils/getRequestAuthUser";

export const updateIssue = async (
  req: express.Request,
  res: express.Response
) => {
  const [isUserAuthorized, author] = await getRequestAuthUser(req);
  const issueId = req.params.issueId;

  try {
    if (!isUserAuthorized) {
      return res.status(400).json({
        success: false,
        data: {
          errors: ["Unauthorized"],
        },
      });
    }

    const updatedIssue = await prisma.issue.update({
      where: {
        id: issueId,
      },
      data: req.body,
    });

    if (!updatedIssue) {
      return res.status(400).json({
        success: false,
        data: {
          errors: ["Unable to create issue"],
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        issue: updatedIssue,
      },
    });
  } catch (error) {
    handleServerError(res, [error]);
  }
};
