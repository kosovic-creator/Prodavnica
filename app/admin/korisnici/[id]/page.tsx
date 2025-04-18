'use client';

import React, { useEffect, useState } from 'react';
import { getUserById } from '@/actions/index'; // Adjust the import path as necessary
import { useParams } from 'next/navigation';

const UserDetails: React.FC = () => {
  const { id } = useParams(); // Assuming you're using Next.js
  const numericId = typeof id === 'string' ? parseInt(id, 10) : NaN;

  const [user, setUser] = useState<{
    id: number;
    name: string;
    username: string;
    email: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (isNaN(numericId)) {
        console.error("Invalid ID in URL:", id);
        setError("Invalid userId.");
        return;
      }

      try {
        const fetchedUser = await getUserById(numericId);
        setUser(fetchedUser);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch user.');
      }
    };

    fetchUser();
  }, [numericId]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!user) {
    return <p>Loading user details...</p>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default UserDetails;