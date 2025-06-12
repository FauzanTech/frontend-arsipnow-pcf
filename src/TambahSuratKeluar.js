import React, { useState } from 'react';
import './TambahSuratKeluar.css';

const TambahSuratKeluar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showSubMasuk, setShowSubMasuk] = useState(false);
  const [showSubKeluar, setShowSubKeluar] = useState(false);

  const [formData, setFormData] = useState({
    no_surat: '',
    tgl_surat: '',
    tujuan: '',
    perihal: '',
    penandatangan: '',
    file_surat: null,
  });

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const toggleSubmenu = (submenu) => {
    if (submenu === 'masuk') setShowSubMasuk(!showSubMasuk);
    else if (submenu === 'keluar') setShowSubKeluar(!showSubKeluar);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { no_surat, tgl_surat, tujuan, perihal, penandatangan, file_surat } = formData;

    if (!no_surat || !tgl_surat || !tujuan || !perihal || !penandatangan || !file_surat) {
      alert('Harap lengkapi semua data!');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('no_surat', no_surat);
    formDataToSend.append('tgl_surat', tgl_surat);
    formDataToSend.append('tujuan', tujuan);
    formDataToSend.append('perihal', perihal);
    formDataToSend.append('penandatangan', penandatangan);
    formDataToSend.append('file_surat', file_surat);

    const token = localStorage.getItem('token');

    fetch(`${process.env.REACT_APP_URL_BASE}/api/keluar/`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token
      },
      body: formDataToSend,
    })
      .then((response) => {
        if (!response.ok) throw new Error('Gagal menyimpan surat');
        return response.json();
      })
      .then(() => {
        alert('Surat Keluar berhasil disimpan!');
        setFormData({
          no_surat: '',
          tgl_surat: '',
          tujuan: '',
          perihal: '',
          penandatangan: '',
          file_surat: null,
        });
      })
      .catch((error) => {
        alert('Terjadi kesalahan: ' + error.message);
      });
  };

  return (
    <div>
      <header className="header">
        <div className="menu-toggle" onClick={toggleSidebar}>☰</div>
        <h1 className="title">Tambah Surat Keluar</h1>
      </header>

      <div className={`container ${!showSidebar ? 'sidebar-closed' : ''}`} id="container">
        <aside className={`sidebar ${!showSidebar ? 'hide' : ''}`} id="sidebar">
          <nav className="menu">
            <button className="menu-item" onClick={() => window.location.href = 'Dashboard'}>🏠 Dashboard</button>

            <div className="menu-group">
              <button className="menu-item" onClick={() => toggleSubmenu('masuk')}>📥 Surat Masuk</button>
              <div className={`submenu ${showSubMasuk ? 'show' : ''}`}>
                <button className="submenu-item" onClick={() => window.location.href = 'TambahSuratMasuk'}>➕ Tambah Surat Masuk</button>
                <button className="submenu-item" onClick={() => window.location.href = 'ListSuratMasuk'}>📄 List Surat Masuk</button>
              </div>
            </div>

            <div className="menu-group">
              <button className="menu-item" onClick={() => toggleSubmenu('keluar')}>📤 Surat Keluar</button>
              <div className={`submenu ${showSubKeluar ? 'show' : ''}`}>
                <button className="submenu-item active">➕ Tambah Surat Keluar</button>
                <button className="submenu-item" onClick={() => window.location.href = 'ListSuratKeluar'}>📄 List Surat Keluar</button>
              </div>
            </div>

            <button className="menu-item" onClick={() => window.location.href = 'PencarianSurat'}>🔎 Pencarian Surat</button>
          </nav>

          <div className="user-section">
            <p>User</p>
            <button className="logout-button" onClick={() => window.location.href = 'Login'}>
               <img
                src="/logout.png"
                alt="Logout Icon"
                style={{ width: '20px', height: '20px', marginRight: '8px', verticalAlign: 'middle' }}
              />
              Keluar
            </button>
          </div>
        </aside>

        <main className="main-content">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="no_surat">Nomor Surat</label>
                <input
                  type="text"
                  id="no_surat"
                  name="no_surat"
                  value={formData.no_surat}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="tgl_surat">Tanggal Surat</label>
                <input
                  type="date"
                  id="tgl_surat"
                  name="tgl_surat"
                  value={formData.tgl_surat}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="tujuan">Tujuan Surat</label>
                <input
                  type="text"
                  id="tujuan"
                  name="tujuan"
                  value={formData.tujuan}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="perihal">Perihal</label>
                <input
                  type="text"
                  id="perihal"
                  name="perihal"
                  value={formData.perihal}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="penandatangan">Penandatangan</label>
                <input
                  type="text"
                  id="penandatangan"
                  name="penandatangan"
                  value={formData.penandatangan}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="file_surat">Upload File Surat</label>
                <input
                  type="file"
                  id="file_surat"
                  name="file_surat"
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="submit-button">Simpan Surat Keluar</button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TambahSuratKeluar;
