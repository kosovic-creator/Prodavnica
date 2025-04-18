'use client';
import React, { useState, useEffect } from 'react';
import { updateUserAction, getUserById } from '@/actions/index'; // Adjust the import path as necessary

const UpdateUserForm: React.FC<{ userId: number }> = ({ userId }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserById(userId);
        if (user) {
          setFormData({
            id: user.id.toString(),
            name: user.name || '',
            username: user.username || '',
            email: user.email || '',
            password: '', // Leave password empty for security reasons
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setMessage('Failed to load user data.');
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await updateUserAction({ message }, new FormData(e.currentTarget));
    setMessage(response.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update User</h2>
      {message && <p>{message}</p>}
      <div>
        <label>
          ID:
          <input type="text" name="id" value={formData.id} onChange={handleChange} required readOnly />
        </label>
      </div>
      <div>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
      </div>
      <button type="submit">Update User</button>
    </form>
  );
};

export default UpdateUserForm;