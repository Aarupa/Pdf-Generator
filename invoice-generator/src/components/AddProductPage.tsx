import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../redux/Slices/productSlice';

const AddProductPage: React.FC = () => {
  const [products, setProducts] = useState([{ name: '', quantity: 0, rate: 0 }]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddProduct = () => {
    setProducts([...products, { name: '', quantity: 0, rate: 0 }]);
  };

  const handleChange = (index: number, field: string, value: any) => {
    const newProducts = [...products];
    newProducts[index] = { ...newProducts[index], [field]: value };
    setProducts(newProducts);
  };

  const handleSubmit = () => {
    products.forEach(product => dispatch(addProduct(product)));
    navigate('/generate-pdf');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-6">Add Product</h2>
        {products.map((product, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              placeholder="Product Name"
              value={product.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={product.quantity}
              onChange={(e) => handleChange(index, 'quantity', Number(e.target.value))}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="number"
              placeholder="Rate"
              value={product.rate}
              onChange={(e) => handleChange(index, 'rate', Number(e.target.value))}
              className="w-full p-2 mb-2 border rounded"
            />
            <div className="mb-2">Total: {product.quantity * product.rate}</div>
            <div className="mb-2">GST (18%): {(product.quantity * product.rate * 0.18).toFixed(2)}</div>
          </div>
        ))}
        <button onClick={handleAddProduct} className="w-full p-2 mb-4 bg-green-500 text-white rounded">
          Add Another Product
        </button>
        <button onClick={handleSubmit} className="w-full p-2 bg-blue-500 text-white rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default AddProductPage;
