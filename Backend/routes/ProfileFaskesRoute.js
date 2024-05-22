import express from 'express';
import {
    getProfileFaskes,
    getProfileFaskesById,
    createProfileFaskes,
    updateProfileFaskes,
    deleteProfileFaskes,
    profileFaskes,
    getProfileFaskesByUserId,
}from "../controllers/ProfileFaskesController.js"
import {verifyUser} from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/userprofilefaskes', profileFaskes);
router.get('/fasilitas/:id', getProfileFaskesByUserId);
router.get('/profilefaskes', verifyUser, getProfileFaskes);
router.get('/profilefaskes/:id', verifyUser, getProfileFaskesById);
router.post('/profilefaskes', verifyUser, createProfileFaskes);
router.patch('/profilefaskes', verifyUser, updateProfileFaskes);
router.delete('/profilefaskes/:id', verifyUser, deleteProfileFaskes);

export default router;