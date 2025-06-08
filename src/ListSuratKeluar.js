import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListSuratKeluar.css';

const ListSuratKeluar = () => {
  const [dataSurat, setDataSurat] = useState([]);
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [submenuMasukOpen, setSubmenuMasukOpen] = useState(false);
  const [submenuKeluarOpen, setSubmenuKeluarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/keluar/', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Gagal mengambil data surat keluar');
        return res.json();
      })
      .then(data => setDataSurat(data))
      .catch(err => {
        console.error(err.message);
        alert('Tidak dapat memuat data surat keluar.');
      });
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('Yakin ingin menghapus surat ini?')) return;

    const token = localStorage.getItem('token');
    fetch(`http://localhost:5000/api/keluar/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Gagal menghapus surat.');
        setDataSurat(dataSurat.filter(surat => surat.id !== id));
        alert('Surat berhasil dihapus.');
      })
      .catch(err => alert(err.message));
  };

  const handleEdit = (id) => {
    navigate(`/EditSuratKeluar/${id}`);
  };

  return (
    <div>
      <header className="header">
        <div className="menu-toggle" onClick={() => setSidebarHidden(!sidebarHidden)}>☰</div>
        <h1 className="title">List Surat Keluar</h1>
      </header>

      <div className="container">
        {!sidebarHidden && (
          <aside className="sidebar">
            <nav className="menu">
              <button className="menu-item" onClick={() => navigate('/dashboard')}>🏠 Dashboard</button>

              <div className="menu-group">
                <button className="menu-item" onClick={() => setSubmenuMasukOpen(!submenuMasukOpen)}>📥 Surat Masuk</button>
                {submenuMasukOpen && (
                  <div className="submenu show">
                    <button className="submenu-item" onClick={() => navigate('/TambahSuratMasuk')}>➕ Tambah Surat Masuk</button>
                    <button className="submenu-item" onClick={() => navigate('/ListSuratMasuk')}>📄 List Surat Masuk</button>
                  </div>
                )}
              </div>

              <div className="menu-group">
                <button className="menu-item" onClick={() => setSubmenuKeluarOpen(!submenuKeluarOpen)}>📤 Surat Keluar</button>
                {submenuKeluarOpen && (
                  <div className="submenu show">
                    <button className="submenu-item" onClick={() => navigate('/TambahSuratKeluar')}>➕ Tambah Surat Keluar</button>
                    <button className="submenu-item active">📄 List Surat Keluar</button>
                  </div>
                )}
              </div>

              <button className="menu-item" onClick={() => navigate('/PencarianSurat')}>🔎 Pencarian Surat</button>
            </nav>

            <div className="user-section">
            <p>User</p>
            <button className="logout-button" onClick={() => {
              localStorage.removeItem('user');
              localStorage.removeItem('token');
              window.location.href = '/';
            }}>
              <span>⏻</span> Keluar
            </button>
          </div>
          </aside>
        )}

        <main className="main-content">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nomor Surat</th>
                  <th>Tanggal Surat</th>
                  <th>Tujuan</th>
                  <th>Perihal</th>
                  <th>Penandatangan</th>
                  <th>File Surat</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataSurat.length > 0 ? (
                  dataSurat.map((surat) => (
                    <tr key={surat.id}>
                      <td>{surat.id}</td>
                      <td>{surat.no_surat}</td>
                      <td>{surat.tgl_surat}</td>
                      <td>{surat.tujuan}</td>
                      <td>{surat.perihal}</td>
                      <td>{surat.penandatangan}</td>
                      <td>
                        <a
                          href={`http://localhost:5000/uploads/${surat.file_surat}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {surat.file_surat}
                        </a>
                      </td>
                      <td>
                        <button onClick={() => handleEdit(surat.id)}>✏️</button>
                        <button onClick={() => handleDelete(surat.id)}>🗑️</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center' }}>
                      Tidak ada data.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ListSuratKeluar;
