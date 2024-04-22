import { NextFunction, Request, Response } from "express";

const roleMiddleware = (role: Roles[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (role.includes("*")) return next();
        if (req.user?.role && role.includes(req.user?.role)) return next();
        else return res.status(401).json({ message: "You do not have any permission to access this data." });
    };
};

export default roleMiddleware;
