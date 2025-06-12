import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListSuratMasuk.css';

const ListSuratMasuk = () => {
  const [dataSurat, setDataSurat] = useState([]);
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [submenuMasukOpen, setSubmenuMasukOpen] = useState(true);
  const [submenuKeluarOpen, setSubmenuKeluarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${process.env.REACT_APP_URL_BASE}/api/masuk/`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Gagal mengambil data surat masuk');
        return res.json();
      })
      .then(data => setDataSurat(data))
      .catch(err => {
        console.error(err.message);
        alert('Tidak dapat memuat data surat masuk.');
      });
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('Yakin ingin menghapus surat ini?')) return;

    const token = localStorage.getItem('token');
    fetch(`${process.env.REACT_APP_URL_BASE}/api/masuk/${id}`, {
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
    navigate(`/EditSuratMasuk/${id}`);
  };

  return (
    <div>
      <header className="header">
        <div className="menu-toggle" onClick={() => setSidebarHidden(!sidebarHidden)}>☰</div>
        <h1 className="title">List Surat Masuk</h1>
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
                    <button className="submenu-item active">📄 List Surat Masuk</button>
                  </div>
                )}
              </div>

              <div className="menu-group">
                <button className="menu-item" onClick={() => setSubmenuKeluarOpen(!submenuKeluarOpen)}>📤 Surat Keluar</button>
                {submenuKeluarOpen && (
                  <div className="submenu show">
                    <button className="submenu-item" onClick={() => navigate('/TambahSuratKeluar')}>➕ Tambah Surat Keluar</button>
                    <button className="submenu-item" onClick={() => navigate('/ListSuratKeluar')}>📄 List Surat Keluar</button>
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
                <img
                  src="/logout.png"
                  alt="Logout Icon"
                  style={{ width: '20px', height: '20px', marginRight: '8px', verticalAlign: 'middle' }}
                />
                Keluar
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
                  <th>Tanggal Diterima</th>
                  <th>Pengirim</th>
                  <th>Perihal</th>
                  <th>File Surat</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataSurat.length > 0 ? (
                  dataSurat.map(surat => (
                    <tr key={surat.id}>
                      <td>{surat.id}</td>
                      <td>{surat.no_surat}</td>
                      <td>{surat.tgl_surat}</td>
                      <td>{surat.tgl_diterima}</td>
                      <td>{surat.pengirim}</td>
                      <td>{surat.perihal}</td>
                      <td>
                        <a
                          href={`${process.env.REACT_APP_URL_BASE}/uploads/${surat.file_surat}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {surat.file_surat}
                        </a>
                      </td>
                      <td style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                        <button onClick={() => handleEdit(surat.id)} style={{ background: 'none', border: 'none', padding: 0, margin: 0 }}>
                          <img
                            src="/edit.png"
                            alt="Edit"
                            style={{ width: '20px', height: '20px', cursor: 'pointer', display: 'block' }}
                          />
                        </button>
                        <button onClick={() => handleDelete(surat.id)} style={{ background: 'none', border: 'none', padding: 0, margin: 0 }}>
                          <img
                            src="/delete.png"
                            alt="Hapus"
                            style={{ width: '20px', height: '20px', cursor: 'pointer', display: 'block' }}
                          />
                        </button>
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

export default ListSuratMasuk;
