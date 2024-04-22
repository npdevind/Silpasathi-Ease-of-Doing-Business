import express from "express";
const router = express.Router();
import * as chartController from "./chartController";
import roleMiddleware from "../../middleware/roleMiddleware";

router.get("/graph-information-of-actual-data", roleMiddleware(["maptrackuser", "DEPTHOD"]), chartController.graphInformationOfActualData);

router.get("/graph-information-of-percentage-data", roleMiddleware(["maptrackuser", "DEPTHOD"]), chartController.graphInformationOfPercentageData);

export default router;
