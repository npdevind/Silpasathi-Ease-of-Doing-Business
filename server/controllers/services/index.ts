import express from "express";
const router = express.Router();

import roleMiddleware from "../../middleware/roleMiddleware";

import * as servicesController from "./servicesController";

// router.get("/get-service-name-suggestion", roleMiddleware(["*"]), servicesController.getServiceNameSuggestion);

router.post("/create-new-caf", roleMiddleware(["investor"]), servicesController.createNewCaf);

export default router;
