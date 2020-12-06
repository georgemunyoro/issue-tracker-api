import * as express from "express";
import { handleServerError, handleSuccessfulRequest } from "../../utils/requestHandlers";
import { getRequestAuthUser } from "../../utils/getRequestAuthUser";

export const loggedInUser = async (req: express.Request, res: express.Response) => {
  try {
    const [success, data] = await getRequestAuthUser(req);
    if (!success) return handleServerError(res, [data.message])
    
    return handleSuccessfulRequest(res, data);

  } catch (error) {
    return handleServerError(res, [error]);
  }
};
