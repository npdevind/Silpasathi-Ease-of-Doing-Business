import express, { Request, Response } from "express";

const webRouter = express.Router();
import * as path from "path";

// all the request come from the server are handled using the react so it will
// point to the build html file of react.
webRouter.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "../public", "index.html"));
});

export default webRouter;
