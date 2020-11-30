import * as express from "express";
import { prisma } from "../../db/client";
import { handleServerError } from "../../utils/errorHandling";
import { getRequestAuthUser } from "../../utils/getRequestAuthUser";

export const deleteProject = async (
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

    const deletedProject = await prisma.issue.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedProject) {
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
        deletedProject,
      },
    });
  } catch (error) {
    handleServerError(res, [error]);
  }
};
