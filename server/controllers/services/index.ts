import express from "express";
const router = express.Router();

import roleMiddleware from "../../middleware/roleMiddleware";

import * as servicesController from "./servicesController";

// router.get("/get-service-name-suggestion", roleMiddleware(["*"]), servicesController.getServiceNameSuggestion);

export default router;
