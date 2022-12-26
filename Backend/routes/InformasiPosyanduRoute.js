import express from "express";
import { verifyAkun, ketuaOnly } from "../middleware/AuthAkun.js";

import {
    muatSemuaInformasiPosyandu,
    updateInformasiPosyandu,
    muatInformasiPosyadu,
} from "../controllers/InformasiPosyandu.js";

const router = express.Router();

router.get("/informasiPosyandu", verifyAkun, muatSemuaInformasiPosyandu);
router.get("/informasiPosyandu/:id", verifyAkun, muatInformasiPosyadu);

router.patch(
    "/informasiPosyandu/:id",
    verifyAkun,
    ketuaOnly,
    updateInformasiPosyandu
);

export default router;
