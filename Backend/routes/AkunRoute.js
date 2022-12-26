import express from "express";
import { verifyAkun, akesAkun } from "../middleware/AuthAkun.js";
import {
    muatSemuaAkunPetugas,
    muatAkun,
    simpanAkun,
    updateAkun,
    hapusAkun,
    muatSemuaAkunIbu,
} from "../controllers/Akun.js";

const router = express.Router();

router.get("/akun1", verifyAkun, akesAkun, muatSemuaAkunPetugas);
router.get("/akun2", verifyAkun, akesAkun, muatSemuaAkunIbu);
router.get("/akun/:noHp", verifyAkun, akesAkun, muatAkun);
router.post("/akun", akesAkun, simpanAkun);
router.patch("/akun/:noHp", verifyAkun, akesAkun, updateAkun);
router.delete("/akun/:noHp", verifyAkun, akesAkun, hapusAkun);

export default router;
