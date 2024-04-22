import express from "express";
import roleMiddleware from "../../middleware/roleMiddleware";
const router = express.Router();
import * as establishmentController from "./establishmentController";
import * as establishmentValidation from "../../middleware/validationMiddleware/establishmentValidation";

router.get("/get-owner-ship-list", roleMiddleware(["investor"]), establishmentController.getOwnerShipList);

router.get("/get-establishment-list", roleMiddleware(["investor"]), establishmentController.getEstablishmentList);

router.post("/add-new-establishment", roleMiddleware(["investor"]), establishmentValidation.insertEstablishment, establishmentController.addNewEstablishment);

export default router;
