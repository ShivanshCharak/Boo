import express from 'express';
import postUploader from '../controller/handleUploadConroller.js';

const router = express.Router();

router.post("/files", postUploader);

export default router;
