import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import MenPage from './components/Men';
import WomenPage from './components/Women';
import KidsPage from './components/Kids';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import CartPage from './components/CartPage'; 
import { CartProvider } from './context/CartContext'; 
import AuthLayout from './components/AuthLayout';
import MainLayout from './components/MainLayout';
import AdminPage from './components/AdminPage';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>

          {/* Pa Navbar/Footer */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminPage />} />

          </Route>

          {/* Me Navbar/Footer */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/edit/:id" element={<EditProduct />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/men" element={<MenPage />} />
            <Route path="/women" element={<WomenPage />} />
            <Route path="/kids" element={<KidsPage />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
