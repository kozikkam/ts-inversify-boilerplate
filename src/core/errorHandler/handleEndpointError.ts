import { Request, Response } from "express";
import { NextFunction } from "connect";

export const handleEndpointError: (handle: (req: Request, res: Response, next: NextFunction) => any) => any = 
    (handle: (req: Request, res: Response, next: NextFunction) => any): any => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            return await handle(req, res, next);
        } catch (error) {
            return next(error);
        }
    }
};
