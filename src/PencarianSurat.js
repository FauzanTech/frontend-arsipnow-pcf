import React, { useState } from 'react';
import './PencarianSurat.css';

const PencarianSurat = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showSubMasuk, setShowSubMasuk] = useState(false);
  const [showSubKeluar, setShowSubKeluar] = useState(false);

  const [keywordMasuk, setKeywordMasuk] = useState('');
  const [keywordKeluar, setKeywordKeluar] = useState('');

  const [hasilMasuk, setHasilMasuk] = useState([]);
  const [hasilKeluar, setHasilKeluar] = useState([]);

  const [loadingMasuk, setLoadingMasuk] = useState(false);
  const [loadingKeluar, setLoadingKeluar] = useState(false);

  const [errorMasuk, setErrorMasuk] = useState('');
  const [errorKeluar, setErrorKeluar] = useState('');

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const toggleSubmenu = (submenu) => {
    if (submenu === 'masuk') setShowSubMasuk(!showSubMasuk);
    else if (submenu === 'keluar') setShowSubKeluar(!showSubKeluar);
  };

  const fetchSurat = (jenis, keyword) => {
    const token = localStorage.getItem('token');
    const url = jenis === 'masuk'
      ? `http://localhost:5000/api/masuk/search/surat?cari=${encodeURIComponent(keyword)}`
      : `http://localhost:5000/api/keluar/search/surat?cari=${encodeURIComponent(keyword)}`;

    if (jenis === 'masuk') {
      setLoadingMasuk(true);
      setErrorMasuk('');
      setHasilMasuk([]);
    } else {
      setLoadingKeluar(true);
      setErrorKeluar('');
      setHasilKeluar([]);
    }

    fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error('Gagal mengambil data surat');
        return res.json();
      })
      .then((data) => {
        const normalized = data.map((item) => {
          if (jenis === 'masuk') {
            return {
              nomor: item.no_surat,
              tglSurat: item.tgl_surat,
              tglDiterima: item.tgl_diterima,
              pengirim: item.pengirim,
              perihal: item.perihal,
              file: item.file_surat
            };
          } else {
            return {
              nomor: item.no_surat,
              tglSurat: item.tgl_surat,
              tujuan: item.tujuan,
              perihal: item.perihal,
              penandatangan: item.penandatangan,
              file: item.file_surat
            };
          }
        });

        if (jenis === 'masuk') {
          setHasilMasuk(normalized);
          setLoadingMasuk(false);
        } else {
          setHasilKeluar(normalized);
          setLoadingKeluar(false);
        }
      })
      .catch((err) => {
        if (jenis === 'masuk') {
          setErrorMasuk(err.message);
          setLoadingMasuk(false);
        } else {
          setErrorKeluar(err.message);
          setLoadingKeluar(false);
        }
      });
  };

  const handleSearch = (e, jenis) => {
    e.preventDefault();
    const keyword = jenis === 'masuk' ? keywordMasuk : keywordKeluar;
    if (keyword.trim()) {
      fetchSurat(jenis, keyword.trim().toLowerCase());
    }
  };

  function getFileNameFromPath(path) {
    return path.split(/[/\\]/).pop();
  }

  return (
    <div>
      <header className="header">
        <div className="menu-toggle" onClick={toggleSidebar}>☰</div>
        <h1 className="title">Pencarian Surat</h1>
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
                <button className="submenu-item" onClick={() => window.location.href = 'TambahSuratKeluar'}>➕ Tambah Surat Keluar</button>
                <button className="submenu-item" onClick={() => window.location.href = 'ListSuratKeluar'}>📄 List Surat Keluar</button>
              </div>
            </div>

            <button className="menu-item active">🔎 Pencarian Surat</button>
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

        <main className="main-content">
          <div className="search-container">
            <form className="search-form" onSubmit={(e) => handleSearch(e, 'masuk')}>
              <input
                type="text"
                placeholder="Cari Surat Masuk..."
                value={keywordMasuk}
                onChange={(e) => setKeywordMasuk(e.target.value)}
              />
              <button type="submit" className="search-button">Cari Surat Masuk</button>
            </form>

            <form className="search-form" onSubmit={(e) => handleSearch(e, 'keluar')} style={{ marginTop: '10px' }}>
              <input
                type="text"
                placeholder="Cari Surat Keluar..."
                value={keywordKeluar}
                onChange={(e) => setKeywordKeluar(e.target.value)}
              />
              <button type="submit" className="search-button">Cari Surat Keluar</button>
            </form>
          </div>

          <div className="table-container">
            <h2>Hasil Surat Masuk</h2>
            <table>
              <thead>
                <tr>
                  <th>Nomor Surat</th>
                  <th>Tanggal Surat</th>
                  <th>Tanggal Diterima</th>
                  <th>Pengirim</th>
                  <th>Perihal</th>
                  <th>File</th>
                </tr>
              </thead>
              <tbody>
                {loadingMasuk ? (
                  <tr><td colSpan="6" style={{ textAlign: 'center' }}>Memuat...</td></tr>
                ) : errorMasuk ? (
                  <tr><td colSpan="6" style={{ textAlign: 'center' }}>{errorMasuk}</td></tr>
                ) : hasilMasuk.length === 0 ? (
                  <tr><td colSpan="6" style={{ textAlign: 'center' }}>Belum ada pencarian</td></tr>
                ) : (
                  hasilMasuk.map((surat, index) => (
                    <tr key={index}>
                      <td>{surat.nomor}</td>
                      <td>{new Date(surat.tglSurat).toLocaleDateString('id-ID')}</td>
                      <td>{new Date(surat.tglDiterima).toLocaleDateString('id-ID')}</td>
                      <td>{surat.pengirim}</td>
                      <td>{surat.perihal}</td>
                      <td>
                        <a
                          href={`http://localhost:5000/uploads/${getFileNameFromPath(surat.file)}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {surat.file}
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <h2 style={{ marginTop: '30px' }}>Hasil Surat Keluar</h2>
            <table>
              <thead>
                <tr>
                  <th>Nomor Surat</th>
                  <th>Tanggal Surat</th>
                  <th>Tujuan</th>
                  <th>Perihal</th>
                  <th>Penandatangan</th>
                  <th>File</th>
                </tr>
              </thead>
              <tbody>
                {loadingKeluar ? (
                  <tr><td colSpan="6" style={{ textAlign: 'center' }}>Memuat...</td></tr>
                ) : errorKeluar ? (
                  <tr><td colSpan="6" style={{ textAlign: 'center' }}>{errorKeluar}</td></tr>
                ) : hasilKeluar.length === 0 ? (
                  <tr><td colSpan="6" style={{ textAlign: 'center' }}>Belum ada pencarian</td></tr>
                ) : (
                  hasilKeluar.map((surat, index) => (
                    <tr key={index}>
                      <td>{surat.nomor}</td>
                      <td>{new Date(surat.tglSurat).toLocaleDateString('id-ID')}</td>
                      <td>{surat.tujuan}</td>
                      <td>{surat.perihal}</td>
                      <td>{surat.penandatangan}</td>
                      <td>
                        <a
                          href={`http://localhost:5000/uploads/${getFileNameFromPath(surat.file)}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {surat.file}
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PencarianSurat;
