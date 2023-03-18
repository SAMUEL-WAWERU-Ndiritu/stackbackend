import { Request, Response, NextFunction } from 'express';

interface ResponsePayload {
  success: boolean;
  code: number;
  message: string;
  data?: any;
}

export const responseHandler = (success: boolean, code: number = 400, message: string = 'valid', data?: any): ResponsePayload => ({
  success,
  code,
  message,
  data,
});

export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next))
    .catch((error) => {
      console.log(error);
      const payload = responseHandler(false, 500, 'Something went wrong', null);
      res.status(payload.code).json(payload);
    });
