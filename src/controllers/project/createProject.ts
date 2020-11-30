import * as express from "express";
import { prisma } from "../../db/client";
import { handleServerError } from "../../utils/errorHandling";
import { getRequestAuthUser } from "../../utils/getRequestAuthUser";

export const createProject = async (
  req: express.Request,
  res: express.Response
) => {
  const [isUserAuthorized, author] = await getRequestAuthUser(req);

  try {
    if (!isUserAuthorized) {
      return res.status(400).json({
        success: false,
        data: {
          errors: ["Unauthorized"],
        },
      });
    }

    req.body["authorId"] = author.id;

    const newProject = await prisma.issue.create({
      data: req.body,
    });

    if (!newProject) {
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
        project: newProject,
      },
    });
  } catch (error) {
    handleServerError(res, [error]);
  }
};
