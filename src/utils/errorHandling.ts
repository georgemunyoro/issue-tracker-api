import * as express from 'express';

export const handleServerError = (res: express.Response<any>, errors: any[]): express.Response => {
  errors.forEach(error => console.error(error));
  return res.status(500).json({
	success: false,
	data: {
	  errors,
	}
  });
}

