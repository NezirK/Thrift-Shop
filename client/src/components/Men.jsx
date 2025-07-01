import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './ProductCard.css';

const MenPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    size: '',
    quality: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products/gender/mashkull');
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

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      size: product.size,
      quality: product.quality
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert('Gabim gjatë përditësimit');
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="products-page">
      <h2 className="products-title">Meshkuj</h2>
      <div className="products-wrapper">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>

      {editingProduct && (
        <form className="edit-form" onSubmit={handleEditSubmit}>
          <h3>Ndrysho Produktin</h3>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Emri" />
          <input name="price" value={formData.price} onChange={handleChange} placeholder="Çmimi" />
          <input name="size" value={formData.size} onChange={handleChange} placeholder="Madhësia" />
          <input name="quality" value={formData.quality} onChange={handleChange} placeholder="Cilësia" />
          <button type="submit">Ruaj Ndryshimet</button>
        </form>
      )}
    </div>
  );
};

export default MenPage;
