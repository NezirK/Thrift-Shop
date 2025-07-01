import React, { useState } from 'react';
import axios from 'axios';
import './AddProduct.css';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    gender: '',
    size: '',
    quality: '',
    image: null,
  });

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
      data.append(key, formData[key]);
    }

    try {
      const res = await axios.post('http://localhost:5000/api/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Produkti u shtua me sukses!');
      setFormData({
        name: '',
        price: '',
        gender: '',
        size: '',
        quality: '',
        image: null,
      });
    } catch (err) {
      console.error(err);
      alert('Ndodhi një gabim gjatë shtimit të produktit.');
    }
  };

  return (
    <div className="add-product-page">
      <h2>Shto Produkt</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <input
          type="text"
          name="name"
          placeholder="Emri i produktit"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <div className="price-wrapper">
          <input
  type="number"
  name="price"
  placeholder="Çmimi"
  value={formData.price}
  onChange={handleChange}
  required
/>
<span className="euro-symbol">€</span>

        </div>

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
          placeholder="Cilësia (e re, pak e përdorur...)"
          value={formData.quality}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
          required
        />

        <button type="submit">Shto Produktin</button>
      </form>
    </div>
  );
};

export default AddProduct;
