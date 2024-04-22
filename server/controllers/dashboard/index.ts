import express from "express";
const router = express.Router();
import * as dashboardController from "./dashboardController";
import roleMiddleware from "../../middleware/roleMiddleware";

router.get("/admin-dynamic-nav-bar", roleMiddleware(["*"]), dashboardController.adminDynamicNavBar);

router.get("/get-eodb-department-list", roleMiddleware(["maptrackuser", "DEPTHOD", "investor"]), dashboardController.getEodbDepartmentList);

router.get("/get-eodb-user-details", roleMiddleware(["*"]), dashboardController.getEodbUserDetails);

router.post("/update-user-profile", roleMiddleware(["*"]), dashboardController.updateUserProfile);

router.get("/check-user-old-pass", roleMiddleware(["*"]), dashboardController.checkUserOldPass);

router.post("/change-user-password", roleMiddleware(["*"]), dashboardController.changeUserPassword);

router.get("/get-total-service-count", roleMiddleware(["investor"]), dashboardController.getTotalServiceCount);

router.get("/get-total-unit-count", roleMiddleware(["investor"]), dashboardController.getTotalUnitCount);

router.get("/get-est-service-info", roleMiddleware(["investor"]), dashboardController.getEstServiceInfo);

router.get("/get-est-service-count", roleMiddleware(["investor"]), dashboardController.getEstServiceCount);

router.get("/est-service-info-by-caf-id", roleMiddleware(["investor"]), dashboardController.estServiceInfoByCafId);

router.get("/get-service-status-list", roleMiddleware(["investor"]), dashboardController.estServiceStatusList);

// router.get("/est-service-status", roleMiddleware(["investor"]), dashboardController.estServiceStatus);

export default router;
