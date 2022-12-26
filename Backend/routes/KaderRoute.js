import express from "express";
import { verifyAkun, ketuaOnly } from "../middleware/AuthAkun.js";

import {
    muatSemuaKaderBidan,
    muatKaderBidan,
    simpanKaderBidan,
    updateKaderBidan,
    hapusKaderBidan,
} from "../controllers/KaderBidan.js";

const router = express.Router();

router.get("/kaderBidan", verifyAkun, ketuaOnly, muatSemuaKaderBidan);
router.get("/kaderBidan/:nik", verifyAkun, ketuaOnly, muatKaderBidan);
router.post("/kaderBidan", verifyAkun, ketuaOnly, simpanKaderBidan);
router.patch("/kaderBidan/:nik", verifyAkun, ketuaOnly, updateKaderBidan);
router.delete("/kaderBidan/:nik", verifyAkun, ketuaOnly, hapusKaderBidan);

export default router;
