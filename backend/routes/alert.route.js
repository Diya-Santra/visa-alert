import express from "express";
import { 
    getAlerts, 
    createAlert, 
    updateAlert, 
    deleteAlert 
} from "../controllers/alert.controller.js";
import { validateAlert } from "../middleware/validator.middleware.js";

const router = express.Router();

router.get("/", getAlerts);
router.post("/", validateAlert, createAlert);
router.put("/:id", validateAlert, updateAlert);
router.delete("/:id", deleteAlert);

export default router;
