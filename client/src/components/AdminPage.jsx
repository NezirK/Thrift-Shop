import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/'); // ridrejto në homepage nëse nuk je admin
    }
  }, [user, navigate]);

  useEffect(() => {
    console.log('Token:', token); // <-- Debug: shiko në console token-in

    const fetchData = async () => {
      try {
        const usersRes = await axios.get('http://localhost:5000/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const productsRes = await axios.get('http://localhost:5000/api/admin/products', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUsers(usersRes.data);
        setProducts(productsRes.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching admin data');
        setLoading(false);
      }
    };

    if(token) fetchData();
  }, [token]);

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      alert('Failed to delete user');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(products.filter(product => product._id !== id));
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  if (loading) return <p>Loading admin data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-page">
      <h1>Admin Panel</h1>

      <section>
        <h2>Users</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Emri</th>
              <th>Email</th>
              <th>Veprime</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleDeleteUser(user._id)}>Fshi</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Products</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Emri</th>
              <th>Çmimi</th>
              <th>Gjini</th>
              <th>Veprime</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.price} €</td>
                <td>{product.gender}</td>
                <td>
                  <button onClick={() => handleDeleteProduct(product._id)}>Fshi</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminPage;
