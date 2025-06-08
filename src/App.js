import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import ListSuratKeluar from './ListSuratKeluar';
import ListSuratMasuk from './ListSuratMasuk';
import PencarianSurat from './PencarianSurat';
import TambahSuratKeluar from './TambahSuratKeluar';
import TambahSuratMasuk from './TambahSuratMasuk';
import EditSuratMasuk from './EditSuratMasuk'; // ✅ Tambahkan ini
import EditSuratKeluar from './EditSuratKeluar';
import Profil from './Profil';
import Logout from './LogOut';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/listsuratkeluar" element={<ListSuratKeluar />} />
        <Route path="/listsuratmasuk" element={<ListSuratMasuk />} />
        <Route path="/pencariansurat" element={<PencarianSurat />} />
        <Route path="/tambahsuratkeluar" element={<TambahSuratKeluar />} />
        <Route path="/tambahsuratmasuk" element={<TambahSuratMasuk />} />
        <Route path="/editsuratmasuk/:id" element={<EditSuratMasuk />} /> {/* ✅ Ini penting */}
        <Route path="/editsuratkeluar/:id" element={<EditSuratKeluar />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
