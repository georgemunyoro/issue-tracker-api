import * as express from "express";
import { prisma } from "../../db/client";
import { handleServerError } from "../../utils/errorHandling";
import { getRequestAuthUser } from "../../utils/getRequestAuthUser";

export const getProject = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const [isUserAuthorized, author] = await getRequestAuthUser(req);
    const projectId = req.params.id;

    if (!isUserAuthorized) {
      return res.status(400).json({
        success: false,
        data: {
          errors: ["Unauthorized"],
        },
      });
    }

    const requestedProject = await prisma.issue.findUnique({
      where: {
        id: projectId,
      }
    });

    if (!requestedProject) {
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
        project: requestedProject,
      },
    });
  } catch (error) {
    handleServerError(res, [error]);
  }
};
