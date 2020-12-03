import * as express from "express";
import { handleServerError, handleSuccessfulRequest } from "../../utils/requestHandlers";
import { getRequestAuthUser } from "../../utils/getRequestAuthUser";

export const loggedInUser = async (req: express.Request, res: express.Response) => {
  try {
    const [err, data] = await getRequestAuthUser(req);
    if (err) handleServerError(res, [data.message])

    handleSuccessfulRequest(res, data);

  } catch (error) {
    return handleServerError(res, [error]);
  }
};
