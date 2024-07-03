import { Router } from 'express';
import { generatePDF } from '../controllers/pdfController'; // Adjust path if needed

const router = Router();

router.post('/generate-pdf', generatePDF);

export default router;
