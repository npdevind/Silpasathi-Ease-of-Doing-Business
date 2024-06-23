import express from "express";
// import jwtMiddleware from "../../middleware/jwtMiddleware";
import * as authController from "./authController";
import jwtMiddleware from "../../middleware/jwtMiddleware";
const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: get new authentication
 *     parameters:
 *       - in: body
 *         name: login
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *         description: Publication object
 *     responses:
 *       200:
 *         description: Publication created successfully
 */
router.post("/login", authController.login);

router.post("/update-user-password", authController.updateUserPassword);

router.get("/user", jwtMiddleware, authController.user);

export default router;
