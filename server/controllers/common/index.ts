import express from "express";
const router = express.Router();
import * as commonController from "./commonController";

router.get("/get-service-wise-user-manual", commonController.getServiceWiseUserManual);

router.get("/service-wise-user-manual-pdf-data", commonController.serviceWiseUserManualPdfData);

router.get("/list-e-service-data", commonController.listEServiceData);

router.get("/get-district-list", commonController.getDistrictList);

router.get("/get-area-type", commonController.getAreaTypeList);

router.get("/get-block-list", commonController.getBlockList);

router.get("/get-gp-ward-list", commonController.getGpWardList);

router.get("/pincode-suggestion", commonController.pinCodeSuggestion);

router.get("/get-police-station-list", commonController.getPoliceStationList);

router.get("/get-service-list", commonController.getServiceList);

export default router;
