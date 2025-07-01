import React from 'react';
import { useCart } from '../context/CartContext';
import { FaTrash } from 'react-icons/fa';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, addToCart, decreaseQuantity } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h2>Shporta</h2>
      {cartItems.length === 0 ? (
        <p>Shporta është bosh.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id} className="cart-item">
                <img src={`http://localhost:5000${item.image}`} alt={item.name} />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>Çmimi: {item.price} €</p>
                  <div className="quantity-control">
                    <button onClick={() => decreaseQuantity(item._id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => addToCart(item)}>+</button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item._id)}>
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <p>Totali: {total.toFixed(2)} €</p>
          </div>
          <div className="cart-buttons">
            <button className="clear-btn" onClick={clearCart}>Pastro Shportën</button>
            <button className="checkout-btn" onClick={() => alert("Checkout do të vijë së shpejti!")}>Bli Tani</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
