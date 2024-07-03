"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pdfController_1 = require("../controllers/pdfController"); // Adjust path if needed
const router = (0, express_1.Router)();
router.post('/generate-pdf', pdfController_1.generatePDF);
exports.default = router;
