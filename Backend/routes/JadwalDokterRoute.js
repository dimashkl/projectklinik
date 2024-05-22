import express from "express";
import {
    getJadwalDokter,
    getJadwalDokterById,
    jadwaldokterUser,
    jadwaldokteruserByUId,
    createJadwalDokter,
    updateJadwalDokter,
    deleteJadwalDokter
} from "../controllers/JadwalDokterController.js";
import { verifyUser } from "../middleware/AuthUser.js"

const router = express.Router();

router.get('/mejadwaldokter', jadwaldokterUser);
router.get('/jadwaldokteruser/:id', jadwaldokteruserByUId);

router.get('/jadwaldokter',verifyUser, getJadwalDokter);
router.get('/jadwaldokterbyid/:id',verifyUser, getJadwalDokterById);
router.post('/jadwaldokter',verifyUser, createJadwalDokter);
router.patch('/jadwaldokter/:id',verifyUser, updateJadwalDokter);
router.delete('/jadwaldokter/:id',verifyUser, deleteJadwalDokter);

export default router;