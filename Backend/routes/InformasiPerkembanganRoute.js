import express from "express";
import { verifyAkun } from "../middleware/AuthAkun.js";
import {
    muatSemuaInformasiPerkembanganBayiBalita,
    muatSemuaInformasiPerkembanganBayiBalitaIbu,
} from "../controllers/InformasiPerkembangan.js";

const router = express.Router();

router.get(
    "/informasiPerkembangan",
    verifyAkun,
    muatSemuaInformasiPerkembanganBayiBalita
);
router.get(
    "/informasiPerkembangan2",
    verifyAkun,
    muatSemuaInformasiPerkembanganBayiBalitaIbu
);

export default router;
