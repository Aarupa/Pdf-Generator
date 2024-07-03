import express from 'express';
import bodyParser from 'body-parser';
import pdfRoutes from './routes/pdfRoutes'; // Correct path to your routes file

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/api/pdf', pdfRoutes); // Correct route prefix

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
