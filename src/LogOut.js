import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Hapus token dan data user dari localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Redirect ke halaman login
    navigate('/');
  }, [navigate]);

  return null; // Tidak menampilkan apa-apa, langsung logout
};

export default Logout;
