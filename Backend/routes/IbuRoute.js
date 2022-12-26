import express from "express";
import { verifyAkun, kaderOnly } from "../middleware/AuthAkun.js";

import {
    muatSemuaIbu,
    muatIbu,
    simpanIbu,
    updateIbu,
    hapusIbu,
} from "../controllers/Ibu.js";

const router = express.Router();

router.get("/ibu", verifyAkun, kaderOnly, muatSemuaIbu);
router.get("/ibu/:nik", verifyAkun, kaderOnly, muatIbu);
router.post("/ibu", verifyAkun, kaderOnly, simpanIbu);
router.patch("/ibu/edit/:nik", verifyAkun, kaderOnly, updateIbu);
router.delete("/ibu/:nik", verifyAkun, kaderOnly, hapusIbu);

export default router;
