import * as express from "express";
import { prisma } from "../../db/client";
import { handleServerError } from "../../utils/errorHandling";
import { getRequestAuthUser } from "../../utils/getRequestAuthUser";

export const deleteIssue = async (
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
          errors: ["User not logged in"],
        },
      });
    }

    const deletedIssue = await prisma.issue.findUnique({
      where: {
        id: issueId,
      },
    });

    if (!deletedIssue) {
      return res.status(400).json({
        success: false,
        data: {
          errors: ["Unable to delete issue"],
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        issue: deletedIssue,
      },
    });
  } catch (error) {
    handleServerError(res, [error]);
  }
};
