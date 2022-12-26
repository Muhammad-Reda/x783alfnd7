import express from "express";
import { verifyAkun, noIbu, kaderOnly } from "../middleware/AuthAkun.js";

import {
    muatSemuaBayiBalita,
    muatBayiBalita,
    simpanBayiBalita,
    updateBayiBalita,
    hapusBayiBalita,
    muatBayiBalitaIbu,
} from "../controllers/BayiBalita.js";

const router = express.Router();

router.get("/bayi", verifyAkun, noIbu, muatSemuaBayiBalita);
router.get("/bayi/:id", verifyAkun, muatBayiBalita);
router.get("/bayi/ibu/:ibuNik", verifyAkun, muatBayiBalitaIbu);
router.post("/bayi", verifyAkun, kaderOnly, simpanBayiBalita);
router.patch("/bayi/:id", verifyAkun, kaderOnly, updateBayiBalita);
router.delete("/bayi/:id", verifyAkun, kaderOnly, hapusBayiBalita);

export default router;
