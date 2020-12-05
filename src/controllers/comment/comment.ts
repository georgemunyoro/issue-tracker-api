import * as express from "express";
import { prisma } from "../../db/client";
import { handleServerError } from "../../utils/requestHandlers";
import { getRequestAuthUser } from "../../utils/getRequestAuthUser";

export const commentOnIssue = async (
  req: express.Request,
  res: express.Response
) => {
  const issueId = req.params.issueId;

  const [isUserAuthorized, author] = await getRequestAuthUser(req);
  const { contents, issue, project } = req.body;

  try {
    if (!isUserAuthorized) {
      return res.status(400).json({
        success: false,
        data: {
          errors: ["User not logged in"],
        },
      });
    }

    const newComment = await prisma.comment.create({
      data: {
        author,
        contents,
        issue,
        project,
      },
    });

    if (!newComment) {
      return res.status(400).json({
        success: false,
        data: {
          errors: ["Unable to create comment"],
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        comment: newComment,
      },
    });
  } catch (error) {
    handleServerError(res, [error]);
  }
};
