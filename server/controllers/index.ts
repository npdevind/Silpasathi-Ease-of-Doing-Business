import express, { Router } from "express";
import common from "../controllers/common";
import auth from "../controllers/auth";
import jwtMiddleware from "../middleware/jwtMiddleware";
import { default as fileUpload } from "express-fileupload";

import dashboard from "../controllers/dashboard";
import chart from "../controllers/chart";
import establishment from "../controllers/establishment";
import services from "../controllers/services";

const controllers = express.Router();

// @ts-ignore
express.Router.group = function (arg1, arg2, arg3) {
    let handlerFunction = arg1;
    let path = "/";
    let middleware = undefined;

    if (arg3) {
        path = arg1;
        middleware = arg2;
        handlerFunction = arg3;
    } else if (arg2) {
        path = arg1;
        handlerFunction = arg2;
    }
    const router = express.Router();
    if (middleware) {
        router.use(middleware);
    }
    handlerFunction(router);
    // @ts-ignore
    this.use(path, router);
    return this;
};

controllers.use(common);
controllers.use(auth);
// @ts-ignore
controllers.group((route: Router) => {
    route.use(jwtMiddleware);
    route.use(
        fileUpload({
            createParentPath: true,
            limits: { fileSize: 50 * 1024 * 1024 /* 50Mb */ },
            useTempFiles: true,
            tempFileDir: "./temp",
        })
    );
    route.use(dashboard);
    route.use(chart);
    route.use(establishment);
    route.use(services);
});

export default controllers;
