import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as authQuery from "../model/auth/authModel";
import { secret } from "../config/secret";

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

const jwtMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = (authHeader && authHeader.split(" ")[1]) || "";
        if (token === null) return res.status(401).json({ message: "Token not found" });

        const user: any = await jwt.verify(token, secret.JWT_TOKEN_SECRET);
        if (!user) return res.status(403).json({ message: "Unauthenticated" });

        const userDetails = await authQuery.userDetails({ username: user.username });
        if (!userDetails) return res.status(403).json({ message: "Unauthenticated" });

        req.user = {
            uid: user?.uid,
            username: user?.username,
            rid: userDetails?.rid,
            role: userDetails?.role,
            fname: userDetails?.fname,
            mname: userDetails?.mname,
            lname: userDetails?.lname,
            mobile: userDetails?.mobile,
            email: userDetails?.email,
            access: userDetails?.access,
        };

        return next();
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export default jwtMiddleware;
