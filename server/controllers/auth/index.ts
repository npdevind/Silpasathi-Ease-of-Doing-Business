import express from "express";
// import jwtMiddleware from "../../middleware/jwtMiddleware";
import * as authController from "./authController";
import jwtMiddleware from "../../middleware/jwtMiddleware";
const router = express.Router();

router.post("/login", authController.login);

router.post("/update-user-password", authController.updateUserPassword);

router.get("/user", jwtMiddleware, authController.user);

export default router;
