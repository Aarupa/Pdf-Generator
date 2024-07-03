"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const pdfRoutes_1 = __importDefault(require("./routes/pdfRoutes")); // Correct path to your routes file
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(body_parser_1.default.json());
app.use('/api/pdf', pdfRoutes_1.default); // Correct route prefix
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
