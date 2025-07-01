import React, { useState } from 'react';
import './ProductCard.css';
import { FaTrash, FaEdit, FaCartPlus, FaCheck, FaTimes } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onDelete, onUpdate }) => {
  const { addToCart } = useCart();
  const user = JSON.parse(localStorage.getItem('user'));
  const isOwner = user && product.owner && (product.owner._id === user._id || product.owner === user._id);

  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    name: product.name,
    price: product.price,
    size: product.size,
    gender: product.gender,
    quality: product.quality,
  });

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`http://localhost:5000/api/products/${product._id}`, editedProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (onUpdate) onUpdate();
      setIsEditing(false);
    } catch (err) {
      console.error('Gabim gjatë përditësimit:', err);
    }
  };

  return (
    <motion.div
      className="product-card"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <img
        src={`http://localhost:5000${product.image}`}
        alt={product.name}
        className="product-img"
      />

      {isEditing ? (
        <>
          <input
            type="text"
            value={editedProduct.name}
            onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
          />
          <input
            type="number"
            value={editedProduct.price}
            onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
          />
          <input
            type="text"
            value={editedProduct.size}
            onChange={(e) => setEditedProduct({ ...editedProduct, size: e.target.value })}
          />
          <input
            type="text"
            value={editedProduct.gender}
            onChange={(e) => setEditedProduct({ ...editedProduct, gender: e.target.value })}
          />
          <input
            type="text"
            value={editedProduct.quality}
            onChange={(e) => setEditedProduct({ ...editedProduct, quality: e.target.value })}
          />
        </>
      ) : (
        <>
          <h3>{product.name}</h3>
          <p>Çmimi: {product.price} €</p>
          <p>Madhësia: {product.size}</p>
          <p>Gjini: {product.gender}</p>
          <p>Cilësia: {product.quality}</p>
        </>
      )}

      <div className="product-actions">
        {isOwner && (
          isEditing ? (
            <>
              <button onClick={handleSave} title="Ruaj ndryshimet">
                <FaCheck />
              </button>
              <button onClick={() => setIsEditing(false)} title="Anulo">
                <FaTimes />
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)} title="Edito">
                <FaEdit />
              </button>
            <button
  onClick={() => {
    const confirm = window.confirm('Je i sigurt që do ta fshish këtë produkt?');
    if (confirm) onDelete(product._id);
  }}
  title="Fshi"
>
  <FaTrash />
</button>

            </>
          )
        )}

        <button onClick={() => addToCart(product)} title="Shto në Shportë">
          <FaCartPlus />
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
