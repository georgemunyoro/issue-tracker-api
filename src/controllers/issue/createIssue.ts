import * as express from "express";
import { prisma } from "../../db/client";
import { handleServerError } from "../../utils/errorHandling";
import { getRequestAuthUser } from "../../utils/getRequestAuthUser";

export const createIssue = async (
  req: express.Request,
  res: express.Response
) => {
  const [isUserAuthorized, author] = await getRequestAuthUser(req);
  const { title, description, board, project, column } = req.body;

  try {
    if (!isUserAuthorized) {
      return res.status(400).json({
        success: false,
        data: {
          errors: ["Unauthorized"],
        },
      });
    }

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

    if (!newIssue) {
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
        issue: newIssue,
      },
    });
  } catch (error) {
    handleServerError(res, [error]);
  }
};
