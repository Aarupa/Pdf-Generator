import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import {store} from './redux/Store'; // Import your Redux store
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import AddProductPage from './components/AddProductPage';
import GeneratePDFPage from './components/GeneratePDFPage';

const App: React.FC = () => {
  return (
    <Provider store={store}> {/* Wrap your App component with Provider and pass store as prop */}
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/generate-pdf" element={<GeneratePDFPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
