import express from "express";
import { muatProfile, updateProfile } from "../controllers/Profile.js";
import { verifyAkun } from "../middleware/AuthAkun.js";

const router = express.Router();

router.get("/profile/:noHp", verifyAkun, muatProfile);
router.patch("/profile/:noHp", verifyAkun, updateProfile);

export default router;
