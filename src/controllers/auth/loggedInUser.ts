import * as express from "express";
import { handleServerError } from "../../utils/errorHandling";
import { getRequestAuthUser } from "../../utils/getRequestAuthUser";

export const loggedInUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const [err, data] = await getRequestAuthUser(req);

    if (!err) {
      return res.status(200).json({
        success: true,
        data,
      });
    }

    return res.status(403).json({
      success: false,
      data: {
        errors: [data.message],
      },
    });
  } catch (error) {
    return handleServerError(res, [error]);
  }
}
