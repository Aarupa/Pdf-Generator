import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';

export const generatePDF = (req: Request, res: Response) => {
  const { products, user } = req.body;

  try {
    const doc = new PDFDocument();
    let buffers: Uint8Array[] = [];
    
    // Collect PDF data into buffers
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
      res.send(pdfData);
    });

    // Create the PDF content
    doc.fontSize(25).text('Invoice', { align: 'center' });
    doc.moveDown();
    doc.fontSize(16).text(`Name: ${user.name}`);
    doc.text(`Email: ${user.email}`);
    doc.text(`Date: ${new Date().toLocaleDateString()}`);
    doc.moveDown();

    doc.fontSize(14).text('Products:', { underline: true });
    const tableHeaders = ['Product Name', 'Quantity', 'Rate', 'Total', 'GST (18%)'];

    // Header
    tableHeaders.forEach(header => {
      doc.text(header, { continued: true, width: 100, align: 'left' });
    });
    doc.moveDown();

    // Product rows
    products.forEach((product: any) => {
      const { name, quantity, rate } = product;
      const total = quantity * rate;
      const gst = (total * 0.18).toFixed(2);

      [name, quantity, rate, total, gst].forEach(item => {
        doc.text(item, { continued: true, width: 100, align: 'left' });
      });
      doc.moveDown();
    });

    // Finalize the PDF
    doc.end();
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ message: 'Failed to generate PDF' });
  }
};
