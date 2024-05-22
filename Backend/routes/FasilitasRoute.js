import express from 'express';
import {
    getFasilitas,
    getFasilitasById,
    createFasilitas,
    updateFasilitas,
    deleteFasilitas,
    fasilUser,
    fasiluserByUserId
}from "../controllers/FasilitasControllers.js";
import {verifyUser} from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/mefasilitas', fasilUser);
router.get('/fasilitasklinik/:id', fasiluserByUserId);


router.get('/fasilitas', verifyUser, getFasilitas);
router.get('/fasilitasbyid/:id', verifyUser, getFasilitasById);
router.post('/fasilitas', verifyUser, createFasilitas);
router.patch('/fasilitas/:id', verifyUser, updateFasilitas);
router.delete('/fasilitas/:id', verifyUser, deleteFasilitas);

export default router;