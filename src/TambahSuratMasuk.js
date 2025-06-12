import React, { useState, useRef } from 'react';
import './TambahSuratMasuk.css';

function TambahSuratMasuk() {
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [submenuMasukShown, setSubmenuMasukShown] = useState(false);
  const [submenuKeluarShown, setSubmenuKeluarShown] = useState(false);
  const formRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarHidden(!sidebarHidden);
  };

  const toggleSubmenu = (submenu) => {
    if (submenu === 'submenu-masuk') {
      setSubmenuMasukShown(!submenuMasukShown);
    } else if (submenu === 'submenu-keluar') {
      setSubmenuKeluarShown(!submenuKeluarShown);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = formRef.current;

    const nomorSurat = form.nomorSurat.value.trim();
    const tanggalDiterima = form.tglDiterima.value.trim();
    const tanggalSurat = form.tanggalSurat.value.trim();
    const pengirim = form.pengirim.value.trim();
    const perihal = form.perihal.value.trim();
    const fileSurat = form.fileSurat.files[0];

    if (!nomorSurat || !tanggalDiterima || !tanggalSurat || !pengirim || !perihal || !fileSurat) {
      alert('Harap lengkapi semua data!');
      return;
    }

    const formData = new FormData();
    formData.append('no_surat', nomorSurat);
    formData.append('tgl_diterima', tanggalDiterima);
    formData.append('tgl_surat', tanggalSurat);
    formData.append('pengirim', pengirim);
    formData.append('perihal', perihal);
    formData.append('file_surat', fileSurat);

    const token = localStorage.getItem('token');

    fetch(`${process.env.REACT_APP_URL_BASE}/api/masuk/`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token
      },
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Gagal menyimpan surat masuk.');
        }
        return response.json();
      })
      .then(data => {
        alert('Surat Masuk berhasil disimpan!');
        form.reset();
      })
      .catch(error => {
        alert(error.message);
      });
  };

  return (
    <div>
      <header className="header">
        <div className="menu-toggle" onClick={toggleSidebar}>☰</div>
        <h1 className="title">Tambah Surat Masuk</h1>
      </header>

      <div className={`container ${sidebarHidden ? 'sidebar-closed' : ''}`} id="container">
        <aside className={`sidebar ${sidebarHidden ? 'hide' : ''}`} id="sidebar">
          <nav className="menu">
            <button className="menu-item" onClick={() => window.location.href = 'Dashboard'}>
              🏠 Dashboard
            </button>

            <div className="menu-group">
              <button className="menu-item" onClick={() => toggleSubmenu('submenu-masuk')}>
                📥 Surat Masuk
              </button>
              <div className={`submenu ${submenuMasukShown ? 'show' : ''}`} id="submenu-masuk">
                <button className="submenu-item active">➕ Tambah Surat Masuk</button>
                <button className="submenu-item" onClick={() => window.location.href = 'ListSuratMasuk'}>📄 List Surat Masuk</button>
              </div>
            </div>

            <div className="menu-group">
              <button className="menu-item" onClick={() => toggleSubmenu('submenu-keluar')}>
                📤 Surat Keluar
              </button>
              <div className={`submenu ${submenuKeluarShown ? 'show' : ''}`} id="submenu-keluar">
                <button className="submenu-item" onClick={() => window.location.href = 'TambahSuratKeluar'}>➕ Tambah Surat Keluar</button>
                <button className="submenu-item" onClick={() => window.location.href = 'ListSuratKeluar'}>📄 List Surat Keluar</button>
              </div>
            </div>

            <button className="menu-item" onClick={() => window.location.href = 'PencarianSurat'}>
              🔎 Pencarian Surat
            </button>
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
            <form id="formSuratMasuk" ref={formRef} onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nomorSurat">Nomor Surat</label>
                <input type="text" id="nomorSurat" name="nomorSurat" required />
              </div>

              <div className="form-group">
                <label htmlFor="tglDiterima">Tanggal Diterima</label>
                <input type="date" id="tglDiterima" name="tglDiterima" required />
              </div>

              <div className="form-group">
                <label htmlFor="tanggalSurat">Tanggal Surat</label>
                <input type="date" id="tanggalSurat" name="tanggalSurat" required />
              </div>

              <div className="form-group">
                <label htmlFor="pengirim">Pengirim</label>
                <input type="text" id="pengirim" name="pengirim" required />
              </div>

              <div className="form-group">
                <label htmlFor="perihal">Perihal</label>
                <input type="text" id="perihal" name="perihal" required />
              </div>

              <div className="form-group">
                <label htmlFor="fileSurat">Upload File Surat</label>
                <input type="file" id="fileSurat" name="fileSurat" required />
              </div>

              <button type="submit" className="submit-button">Simpan Surat Masuk</button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default TambahSuratMasuk;
