import express from "express";
import {
    getdataPasien,
    createdataPasien,
    getdataPasienId,
    updatedataPasien,
    deletedataPasien
} from "../controllers/DataPasienController.js"


const router = express.Router();


router.get('/datapasien', getdataPasien);
router.post('/datapasien', createdataPasien);
router.get('/datapasien/:id', getdataPasienId);
router.patch('/datapasien/:id', updatedataPasien);
router.delete('/datapasien/:id', deletedataPasien);

export default router;