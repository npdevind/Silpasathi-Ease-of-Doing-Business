import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import controllers from "../controllers";

const apiRouter = express.Router();
apiRouter.use(cors<Request>());
apiRouter.use(controllers);

apiRouter.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err);
    }
    if (req.headers.accept === "controllers/json") res.sendStatus(500).json(JSON.stringify(err));
});

export default apiRouter;
