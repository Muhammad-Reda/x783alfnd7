import express from "express";
import { verifyAkun, noIbu, kaderOnly } from "../middleware/AuthAkun.js";

import {
    muatSemuaPerkembanganBayiBalita,
    muatPerkembanganBayiBalita,
    muatDataPerkembanganChart,
    simpanPerkembanganBayiBalita,
    updatePerkembanganBayiBalita,
    hapusPerkembanganBayiBalita,
    muatPerkembanganBayiBalitaIbu,
    muatDataImunisasi,
} from "../controllers/PerkembanganBayiBalita.js";

const router = express.Router();

router.get("/perkembangan", verifyAkun, noIbu, muatSemuaPerkembanganBayiBalita);
router.get("/perkembangan/:id", verifyAkun, muatPerkembanganBayiBalita);
router.get("/perkembanganChart", verifyAkun, muatDataPerkembanganChart);
router.get("/perkembanganImunisasi", verifyAkun, muatDataImunisasi);
router.get(
    "/perkembangan/ibu/:noHp",
    verifyAkun,
    muatPerkembanganBayiBalitaIbu
);
router.post(
    "/perkembangan",
    verifyAkun,
    kaderOnly,
    simpanPerkembanganBayiBalita
);
router.patch(
    "/perkembangan/:id",
    verifyAkun,
    kaderOnly,
    updatePerkembanganBayiBalita
);
router.delete(
    "/perkembangan/:id",
    verifyAkun,
    kaderOnly,
    hapusPerkembanganBayiBalita
);

export default router;
