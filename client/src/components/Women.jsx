import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './ProductCard.css';

const WomenPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products/gender/femer');
    setProducts(res.data);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert('Gabim gjatë fshirjes së produktit');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, editingProduct, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchProducts();
      setEditingProduct(null);
      alert('Produkti u përditësua me sukses!');
    } catch (err) {
      console.error(err);
      alert('Gabim gjatë përditësimit');
    }
  };

  return (
    <div className="products-page">
      <h2 className="products-title">Femra</h2>
      <div className="products-wrapper">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onDelete={handleDelete}
            onEdit={(product) => setEditingProduct(product)}
          />
        ))}
      </div>

      {editingProduct && (
        <form onSubmit={handleUpdate} className="edit-product-form">
          <h3>Ndrysho Produktin</h3>
          <input
            type="text"
            value={editingProduct.name}
            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
            placeholder="Emri i produktit"
          />
          <input
            type="number"
            value={editingProduct.price}
            onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
            placeholder="Çmimi"
          />
          <input
            type="text"
            value={editingProduct.size}
            onChange={(e) => setEditingProduct({ ...editingProduct, size: e.target.value })}
            placeholder="Madhësia"
          />
          <input
            type="text"
            value={editingProduct.quality}
            onChange={(e) => setEditingProduct({ ...editingProduct, quality: e.target.value })}
            placeholder="Cilësia"
          />
          <button type="submit">Përditëso</button>
        </form>
      )}
    </div>
  );
};

export default WomenPage;
