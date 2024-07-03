import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/Store';

const GeneratePDFPage: React.FC = () => {
  const products = useSelector((state: RootState) => state.product.products);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleGeneratePDF = async () => {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ products, user })
        };

        const response = await fetch('/api/pdf/generate-pdf', requestOptions);

        if (!response.ok) {
            throw new Error('Failed to generate PDF');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'invoice.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
};

  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-6">Generate PDF</h2>
        <button onClick={handleGeneratePDF} className="w-full p-2 bg-blue-500 text-white rounded">
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default GeneratePDFPage;
