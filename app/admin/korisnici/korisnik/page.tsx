import { useParams } from 'next/navigation';
import UserDetails from '@/app/admin/korisnici/[id]/page'; // Import the UserDetails component

const UserPage = () => {
  const { id } = useParams(); // Get the user ID from the URL
  return <UserDetails userId={id || ''} />;
};

export default UserPage;