import { verify } from "argon2";
import express from "express";
import {
    getDynamics,
    getDynamicyId,
    createDynamic,
    updateDynamic,
    deleteDynamic
} from "../controllers/Formulir.js";
import { verifyUser } from "../middleware/AuthUser.js";
import { meUser, meUserId } from "../controllers/Formulir.js";

const router = express.Router();

router.get('/meuser',meUser);
router.get('/fasilitas/:id/:namafasilitas',meUserId);

router.get('/dynamics',verifyUser, getDynamics);
router.get('/dynamics/:id',verifyUser, getDynamicyId);
router.post('/dynamics',verifyUser, createDynamic);
router.patch('/dynamics/:id',verifyUser, updateDynamic );
router.delete('/dynamics/:id',verifyUser, deleteDynamic);

export default router;