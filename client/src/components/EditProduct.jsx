import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditProduct.css';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    gender: '',
    size: '',
    quality: '',
    image: null,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products`);
        const product = res.data.find((p) => p._id === id);
        if (product) {
          setFormData({
            name: product.name,
            price: product.price,
            gender: product.gender,
            size: product.size,
            quality: product.quality,
            image: null,
          });
        }
      } catch (err) {
        console.error(err);
        alert('Gabim në ngarkimin e produktit');
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    }

    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Produkti u përditësua me sukses!');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Gabim gjatë përditësimit.');
    }
  };

  return (
    <div className="edit-product-page">
      <h2>Ndrysho Produktin</h2>
      <form onSubmit={handleSubmit} className="edit-product-form">
        <input
          type="text"
          name="name"
          placeholder="Emri i produktit"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Çmimi"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Zgjidh gjininë</option>
          <option value="mashkull">Meshkuj</option>
          <option value="femer">Femra</option>
          <option value="femije">Fëmijë</option>
        </select>

        <select
          name="size"
          value={formData.size}
          onChange={handleChange}
          required
        >
          <option value="">Zgjidh madhësinë</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>

        <input
          type="text"
          name="quality"
          placeholder="Cilësia"
          value={formData.quality}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
        />

        <button type="submit">Ruaj Ndryshimet</button>
      </form>
    </div>
  );
};

export default EditProduct;
