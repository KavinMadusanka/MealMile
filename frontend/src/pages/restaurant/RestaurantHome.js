import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Layout from '../../components/Layout/Layout';
import MenuItemForm from './MenuItemForm';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Required for accessibility

const RestaurantHome = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [editingItem, setEditingItem] = useState(null);
  const navigate = useNavigate();

  const getRestaurantId = () => {
    const user = localStorage.getItem('auth');
    if (!user) return null;
    try {
      const parsedUser = JSON.parse(user);
      return parsedUser.user.id;
    } catch (err) {
      console.error("Error parsing user from localStorage", err);
      return null;
    }
  };

  const fetchMenuItems = async () => {
    try {
      const res = await axios.get('http://localhost:8086/api/v1/menuItem/getAllMenu');
      if (res.data.success) {
        const restaurantId = getRestaurantId();
        if (!restaurantId) return;
        const myItems = res.data.MenuItems.filter(item => item.restaurantId === restaurantId);
        setMenuItems(myItems);
      } else {
        toast.error('Failed to fetch menu items');
      }
    } catch (error) {
      toast.error('Error fetching menu items');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8086/api/v1/menuItem/deleteMenu/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        fetchMenuItems();
      } else {
        toast.error('Failed to delete');
      }
    } catch (err) {
      toast.error('Error deleting item');
    }
  };

  const handleUpdate = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleFormSuccess = () => {
    setIsModalOpen(false); // Close modal
    fetchMenuItems(); 
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <Layout>
      <div style={{ padding: '30px' }}>
        <h2>My Menu Items</h2>
        <button className='addButtonStyle' onClick={() => setIsModalOpen(true)}>+ New Menu Item</button>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#EEEEEE' }}>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Price (Rs.)</th>
              <th style={thStyle}>Tags</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item) => (
              <tr key={item._id}>
                <td style={tdStyle}>{item.name}</td>
                <td style={tdStyle}>{item.category}</td>
                <td style={tdStyle}>{item.price}</td>
                <td style={tdStyle}>{item.tags?.join(', ')}</td>
                <td style={tdStyle}>
                  <button style={btnStyle} onClick={() => handleUpdate(item)}>Update</button>
                  <button style={{ ...btnStyle, backgroundColor: '#e74c3c' }} onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for New Menu Item */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => {
            setIsModalOpen(false);
            setEditingItem(null); // Reset editingItem when modal is closed
          }}
          style={customModalStyles}
        >
          <MenuItemForm
            onSuccess={handleFormSuccess}
            onClose={() => {
              setIsModalOpen(false);
              setEditingItem(null);
            }}
            editingItem={editingItem} // Pass this prop
          />
        </Modal>

      </div>
      <style>
      {`
        .addButtonStyle {
          padding: 10px;
          font-size: 16px;
          background-color: #BF3131;
          color: #EEEEEE;
          border: none;
          cursor: pointer;
          border-radius: 4px;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }
        .addButtonStyle:hover {
            background-color: #7D0A0A;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
          }
      `}
      </style>
    </Layout>
  );
};

// Styles
const thStyle = {
  padding: '12px',
  borderBottom: '1px solid #ddd',
  textAlign: 'left',
};

const tdStyle = {
  padding: '12px',
  borderBottom: '1px solid #ddd',
};

const btnStyle = {
  marginRight: '8px',
  padding: '6px 10px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#3498db',
  color: '#fff',
  cursor: 'pointer',
};

const customModalStyles = {
  content: {
    width: '600px',
    margin: 'auto',
    padding: '20px',
    borderRadius: '10px'
  },
};

export default RestaurantHome;
