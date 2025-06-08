// import React, { useState } from 'react';
// import './Profil.css';

// const Profil = () => {
//   const [isSidebarHidden, setIsSidebarHidden] = useState(false);
//   const [submenuMasukVisible, setSubmenuMasukVisible] = useState(false);
//   const [submenuKeluarVisible, setSubmenuKeluarVisible] = useState(false);

//   const toggleSidebar = () => {
//     const hidden = !isSidebarHidden;
//     setIsSidebarHidden(hidden);

//     fetch('https://your-backend-url.com/api/user/sidebar', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer ' + localStorage.getItem('token'),
//       },
//       body: JSON.stringify({ hidden }),
//     }).catch((error) => {
//       console.error('Gagal menyimpan status sidebar:', error);
//     });
//   };

//   const toggleSubmenu = (submenu) => {
//     if (submenu === 'masuk') {
//       setSubmenuMasukVisible(!submenuMasukVisible);
//     } else if (submenu === 'keluar') {
//       setSubmenuKeluarVisible(!submenuKeluarVisible);
//     }
//   };

//   return (
//     <div>
//       <header className="profil-header">
//         <div className="profil-menu-toggle" onClick={toggleSidebar}>
//           ☰
//         </div>
//         <h1 className="profil-title">Profile</h1>
//       </header>

//       <div className="profil-container">
//         <aside className={`profil-sidebar ${isSidebarHidden ? 'hide' : ''}`}>
//           <nav className="profil-menu">
//             <button className="profil-menu-item" onClick={() => (window.location.href = 'Dashboard')}>
//               🏠 Dashboard
//             </button>

//             <div className="profil-menu-group">
//               <button className="profil-menu-item" onClick={() => toggleSubmenu('masuk')}>
//                 📥 Surat Masuk
//               </button>
//               <div className={`profil-submenu ${submenuMasukVisible ? 'show' : ''}`}>
//                 <button className="profil-submenu-item" onClick={() => (window.location.href = 'TambahSuratMasuk')}>
//                   ➕ Tambah Surat Masuk
//                 </button>
//                 <button className="profil-submenu-item" onClick={() => (window.location.href = 'ListSuratMasuk')}>
//                   📄 List Surat Masuk
//                 </button>
//               </div>
//             </div>

//             <div className="profil-menu-group">
//               <button className="profil-menu-item" onClick={() => toggleSubmenu('keluar')}>
//                 📤 Surat Keluar
//               </button>
//               <div className={`profil-submenu ${submenuKeluarVisible ? 'show' : ''}`}>
//                 <button className="profil-submenu-item" onClick={() => (window.location.href = 'TambahSuratKeluar')}>
//                   ➕ Tambah Surat Keluar
//                 </button>
//                 <button className="profil-submenu-item" onClick={() => (window.location.href = 'ListSuratKeluar')}>
//                   📄 List Surat Keluar
//                 </button>
//               </div>
//             </div>

//             <button className="profil-menu-item" onClick={() => (window.location.href = 'PencarianSurat')}>
//               🔎 Pencarian Surat
//             </button>
//           </nav>

//           <div className="profil-user-section">
//             <p>User</p>
//             <button className="profil-logout-button" onClick={() => (window.location.href = '/')}>
//               <span>⏻</span> Keluar
//             </button>
//           </div>
//         </aside>

//         <main className="profil-main-content">
//           <div className="profil-profile-content">
//             <div className="profil-profile-icon">👤</div>
//             <h2 className="profil-profile-name">PROFIL FAUZAN</h2>

//             <div className="profil-profile-details">
//               <p><strong>Alamat:</strong> Jl. Merdeka No. 123, Jakarta</p>
//               <p><strong>No. Telepon:</strong> 0812-3456-7890</p>
//               <p><strong>Email:</strong> fauzan@example.com</p>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Profil;


// src/pages/Profil.jsx
import React, { useState, useEffect } from 'react';
import './Profil.css';

const Profil = () => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  const [submenuMasukVisible, setSubmenuMasukVisible] = useState(false);
  const [submenuKeluarVisible, setSubmenuKeluarVisible] = useState(false);
  const [userData, setUserData] = useState({
    nama: '',
    alamat: '',
    no_telepon: '',
    email: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/user/token/profile', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Gagal mengambil data profil');
        return res.json();
      })
      .then(data => {
        setUserData(data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const toggleSidebar = () => {
    const hidden = !isSidebarHidden;
    setIsSidebarHidden(hidden);

    fetch('http://localhost:5000/api/user/sidebar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({ hidden }),
    }).catch(console.error);
  };

  const toggleSubmenu = (submenu) => {
    if (submenu === 'masuk') {
      setSubmenuMasukVisible(!submenuMasukVisible);
    } else if (submenu === 'keluar') {
      setSubmenuKeluarVisible(!submenuKeluarVisible);
    }
  };

  return (
    <div>
      <header className="profil-header">
        <div className="profil-menu-toggle" onClick={toggleSidebar}>
          ☰
        </div>
        <h1 className="profil-title">Profile</h1>
      </header>

      <div className="profil-container">
        <aside className={`profil-sidebar ${isSidebarHidden ? 'hide' : ''}`}>
          <nav className="profil-menu">
            <button className="profil-menu-item" onClick={() => (window.location.href = 'Dashboard')}>
              🏠 Dashboard
            </button>

            <div className="profil-menu-group">
              <button className="profil-menu-item" onClick={() => toggleSubmenu('masuk')}>
                📥 Surat Masuk
              </button>
              <div className={`profil-submenu ${submenuMasukVisible ? 'show' : ''}`}>
                <button className="profil-submenu-item" onClick={() => (window.location.href = 'TambahSuratMasuk')}>
                  ➕ Tambah Surat Masuk
                </button>
                <button className="profil-submenu-item" onClick={() => (window.location.href = 'ListSuratMasuk')}>
                  📄 List Surat Masuk
                </button>
              </div>
            </div>

            <div className="profil-menu-group">
              <button className="profil-menu-item" onClick={() => toggleSubmenu('keluar')}>
                📤 Surat Keluar
              </button>
              <div className={`profil-submenu ${submenuKeluarVisible ? 'show' : ''}`}>
                <button className="profil-submenu-item" onClick={() => (window.location.href = 'TambahSuratKeluar')}>
                  ➕ Tambah Surat Keluar
                </button>
                <button className="profil-submenu-item" onClick={() => (window.location.href = 'ListSuratKeluar')}>
                  📄 List Surat Keluar
                </button>
              </div>
            </div>

            <button className="profil-menu-item" onClick={() => (window.location.href = 'PencarianSurat')}>
              🔎 Pencarian Surat
            </button>
          </nav>

          <div className="profil-user-section">
            <p>User</p>
            <button className="profil-logout-button" onClick={() => (window.location.href = '/')}>
              <span>⏻</span> Keluar
            </button>
          </div>
        </aside>

        <main className="profil-main-content">
          <div className="profil-profile-content">
            <div className="profil-profile-icon">👤</div>
            <h2 className="profil-profile-name">PROFIL {userData.nama?.toUpperCase()}</h2>

            <div className="profil-profile-details">
              <p><strong>Alamat:</strong> {userData.alamat}</p>
              <p><strong>No. Telepon:</strong> {userData.no_telepon}</p>
              <p><strong>Email:</strong> {userData.email}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profil;
