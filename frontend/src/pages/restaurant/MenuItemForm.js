import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth.js';
import { useParams } from 'react-router-dom';

const MenuItemForm = ({editingItem, onSuccess, onClose}) => {
  const itemId = editingItem?._id;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null); // Can be File or URL
  const [tags, setTags] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [auth, setAuth] = useAuth();

  // Fetch menu item details if editing
  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const res = await axios.get(`http://localhost:8086/api/v1/menuItem/getItem/${itemId}`);
        const img = await axios.get(`http://localhost:8086/api/v1/menuItem/getItem/${itemId}`);
        const item = res.data.item;
        setName(item.name || '');
        setDescription(item.description || '');
        setPrice(item.price || '');
        setCategory(item.category || '');
        setTags(Array.isArray(item.tags) ? item.tags.join(', ') : item.tags || '');
        setIsAvailable(item.isAvailable ?? true);
        if (item.image && item._id) {
          setImage(`http://localhost:8086/api/v1/menuItem/getItem/${itemId}`);
        }
      } catch (err) {
        console.error("Error fetching item:", err);
        toast.error("Failed to load item details.");
      }
    };
  
    if (itemId) fetchMenuItem();
  }, [itemId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newItem = new FormData();
      newItem.append("name", name);
      newItem.append("description", description);
      newItem.append("price", price);
      newItem.append("category", category);
      newItem.append("isAvailable", isAvailable);
      newItem.append("tags", tags);
      if (image && typeof image !== 'string') {
        newItem.append("image", image);
      }

      let res;
      if (itemId) {
        // Update
        res = await axios.put(`http://localhost:8086/api/v1/menuItem/updateMenu/${itemId}`, newItem, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        });
      } else {
        // Create
        res = await axios.post('http://localhost:8086/api/v1/menuItem/AddMenu', newItem, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        });
      }

      if (res.data.success) {
        toast.success(res.data.message);
        setName('');
        setDescription('');
        setPrice('');
        setCategory('');
        setImage(null);
        setTags('');
        setIsAvailable(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error('Error submitting menu item:', error);
      toast.error('Access Denied, Unauthorized Access.');
    }
  };

  const styles = {
    container: {
      maxWidth: '500px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px'
    },
    formGroup: {
      marginBottom: '15px'
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold'
    },
    input: {
      width: '100%',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ccc'
    },
    textarea: {
      width: '100%',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ccc'
    },
    checkbox: {
      transform: 'scale(1.2)',
      marginLeft: '10px'
    },
    imgPreview: {
      display: 'block',
      margin: '10px auto',
      maxHeight: '200px',
      borderRadius: '8px'
    },
    uploadBox: {
      marginBottom: '15px'
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          .addButtonStyle {
            padding: 10px 40px;
            font-size: 16px;
            background-color: #BF3131;
            color: #EEEEEE;
            border: none;
            cursor: pointer;
            border-radius: 4px;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
            transition: background-color 0.3s ease, box-shadow 0.3s ease;
            white-space: nowrap;
          }
          .addButtonStyle:hover {
            background-color: #7D0A0A;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
          }
          .buttonContainer {
            display: flex;
            justify-content: center;
            margin-top: 20px;
          }
        `}
      </style>

      <h2 style={styles.heading}>{itemId ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={styles.textarea} />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required style={styles.input} />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Category:</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required style={styles.input} />
        </div>

        <div style={styles.uploadBox}>
          <label style={styles.label}>Upload Photo:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {image && (
          typeof image === 'string' ? (
            <img src={image} alt="Preview" style={styles.imgPreview} />
          ) : (
            <img src={URL.createObjectURL(image)} alt="Preview" style={styles.imgPreview} />
          )
        )}

        <div style={styles.formGroup}>
          <label style={styles.label}>Tags (comma separated):</label>
          <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} style={styles.input} />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Available:</label>
          <input type="checkbox" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} style={styles.checkbox} />
        </div>

        <div className="buttonContainer">
          <button type="submit" className="addButtonStyle">{itemId ? 'Update Menu Item' : 'Add Menu Item'}</button>
        </div>
      </form>
    </div>
  );
};

export default MenuItemForm;
