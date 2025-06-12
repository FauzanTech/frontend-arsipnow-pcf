// import React, { useState, useEffect } from 'react';
// import './Dashboard.css';

// const Dashboard = () => {
//   const [sidebarVisible, setSidebarVisible] = useState(true);
//   const [submenuOpen, setSubmenuOpen] = useState({
//     masuk: false,
//     keluar: false
//   });
//   const [jumlahMasuk, setJumlahMasuk] = useState(0);
//   const [jumlahKeluar, setJumlahKeluar] = useState(0);

//   const toggleSidebar = () => {
//     setSidebarVisible(!sidebarVisible);
//   };

//   useEffect(() => {
//   fetch('http://localhost:5000/api/masuk/jumlah/surat')
//     .then(res => {
//       if (!res.ok) {
//         throw new Error('Gagal mengambil surat masuk');
//       }
//       return res.json();
//     })
//     .then(data => setJumlahMasuk(data.count))
//     .catch(err => console.error(err));

//   fetch('http://localhost:5000/api/keluar/jumlah/surat')
//     .then(res => {
//       if (!res.ok) {
//         throw new Error('Gagal mengambil surat keluar');
//       }
//       return res.json();
//     })
//     .then(data => setJumlahKeluar(data.count))
//     .catch(err => console.error(err));
// }, []);


//   const toggleSubmenu = (type) => {
//     const updated = {
//       ...submenuOpen,
//       [type]: !submenuOpen[type]
//     };
//     setSubmenuOpen(updated);

//     fetch('https://your-backend-url.com/api/log-submenu', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + localStorage.getItem('token')
//       },
//       body: JSON.stringify({
//         submenuId: `submenu-${type}`,
//         opened: updated[type],
//         timestamp: new Date().toISOString()
//       })
//     }).catch(console.error);
//   };

//   return (
//     <>
//       <header className="header">
//         <div className="menu-toggle" onClick={toggleSidebar}>☰</div>
//         <div className="app-title">ArsipNow</div>
//       </header>

//       <div className="container">
//         <aside className={`sidebar ${!sidebarVisible ? 'hide' : ''}`}>
//           <div className="profile" onClick={() => window.location.href = '/Profil'}>
//             <div className="profile-photo"></div>
//             <div className="profile-info">
//               <p>Nama Fauzan</p>
//               <p>Jabatan Admin</p>
//             </div>
//           </div>

//           <nav className="menu">
//             <button className="menu-item active" onClick={() => window.location.href = '/Dashboard'}>
//               🏠 Dashboard
//             </button>

//             <div className="menu-group">
//               <button className="menu-item" onClick={() => toggleSubmenu('masuk')}>
//                 📥 Surat Masuk
//               </button>
//               <div className={`submenu ${submenuOpen.masuk ? 'show' : ''}`}>
//                 <button className="submenu-item" onClick={() => window.location.href = '/TambahSuratMasuk'}>
//                   ➕ Tambah Surat Masuk
//                 </button>
//                 <button className="submenu-item" onClick={() => window.location.href = '/ListSuratMasuk'}>
//                   📄 List Surat Masuk
//                 </button>
//               </div>
//             </div>

//             <div className="menu-group">
//               <button className="menu-item" onClick={() => toggleSubmenu('keluar')}>
//                 📤 Surat Keluar
//               </button>
//               <div className={`submenu ${submenuOpen.keluar ? 'show' : ''}`}>
//                 <button className="submenu-item" onClick={() => window.location.href = '/TambahSuratKeluar'}>
//                   ➕ Tambah Surat Keluar
//                 </button>
//                 <button className="submenu-item" onClick={() => window.location.href = '/ListSuratKeluar'}>
//                   📄 List Surat Keluar
//                 </button>
//               </div>
//             </div>

//             <button className="menu-item" onClick={() => window.location.href = '/PencarianSurat'}>
//               🔎 Pencarian Surat
//             </button>
//           </nav>

//           <div className="user-section">
//             <p>User</p>
//             <button className="logout-button" onClick={() => window.location.href = '/'}>
//               <span>⏻</span> Keluar
//             </button>
//           </div>
//         </aside>

//         <main className="main-content" id="mainContent">
//           <div className="cards">
//             <div className="card blue">
//               <img src="https://img.icons8.com/ios-filled/50/000000/new-post.png" alt="Total surat" />
//               <h3>Total surat</h3>
//               <p className="count">{jumlahMasuk + jumlahKeluar}</p>
//             </div>
//             <div className="card green">
//               <img src="https://img.icons8.com/ios-filled/50/000000/inbox.png" alt="Surat masuk" />
//               <h3>Surat masuk</h3>
//               <p className="count">{jumlahMasuk}</p>
//             </div>
//             <div className="card orange">
//               <img src="https://img.icons8.com/ios-filled/50/000000/outbox.png" alt="Surat keluar" />
//               <h3>Surat keluar</h3>
//               <p className="count">{jumlahKeluar}</p>
//             </div>
//           </div>

//           <div className="welcome-box">
//             <h4>Dashboard</h4>
//             <p>Selamat datang, Fauzan</p>
//           </div>
//         </main>
//       </div>
//     </>
//   );
// };

// export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import './Dashboard.css';

// const Dashboard = () => {
//   const [sidebarVisible, setSidebarVisible] = useState(true);
//   const [submenuOpen, setSubmenuOpen] = useState({
//     masuk: false,
//     keluar: false
//   });
//   const [jumlahMasuk, setJumlahMasuk] = useState(0);
//   const [jumlahKeluar, setJumlahKeluar] = useState(0);
//   const [namaUser, setNamaUser] = useState('');

//   const toggleSidebar = () => {
//     setSidebarVisible(!sidebarVisible);
//   };

//   useEffect(() => {
//     // Ambil jumlah surat masuk
//     fetch('http://localhost:5000/api/masuk/jumlah/surat')
//       .then(res => {
//         if (!res.ok) throw new Error('Gagal mengambil surat masuk');
//         return res.json();
//       })
//       .then(data => setJumlahMasuk(data.count))
//       .catch(err => console.error(err));

//     // Ambil jumlah surat keluar
//     fetch('http://localhost:5000/api/keluar/jumlah/surat')
//       .then(res => {
//         if (!res.ok) throw new Error('Gagal mengambil surat keluar');
//         return res.json();
//       })
//       .then(data => setJumlahKeluar(data.count))
//       .catch(err => console.error(err));

//     // Ambil nama user dari localStorage
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       try {
//         const user = JSON.parse(storedUser);
//         setNamaUser(user.nama);
//       } catch (e) {
//         console.error('Gagal membaca user dari localStorage', e);
//       }
//     }
//   }, []);

//   const toggleSubmenu = (type) => {
//     const updated = {
//       ...submenuOpen,
//       [type]: !submenuOpen[type]
//     };
//     setSubmenuOpen(updated);

//     fetch('https://your-backend-url.com/api/log-submenu', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + localStorage.getItem('token')
//       },
//       body: JSON.stringify({
//         submenuId: `submenu-${type}`,
//         opened: updated[type],
//         timestamp: new Date().toISOString()
//       })
//     }).catch(console.error);
//   };

//   return (
//     <>
//       <header className="header">
//         <div className="menu-toggle" onClick={toggleSidebar}>☰</div>
//         <div className="app-title">ArsipNow</div>
//       </header>

//       <div className="container">
//         <aside className={`sidebar ${!sidebarVisible ? 'hide' : ''}`}>
//           <div className="profile" onClick={() => window.location.href = '/Profil'}>
//             <div className="profile-photo"></div>
//             <div className="profile-info">
//               <p>Nama {namaUser}</p>
//               <p>Jabatan Admin</p>
//             </div>
//           </div>

//           <nav className="menu">
//             <button className="menu-item active" onClick={() => window.location.href = '/Dashboard'}>
//               🏠 Dashboard
//             </button>

//             <div className="menu-group">
//               <button className="menu-item" onClick={() => toggleSubmenu('masuk')}>
//                 📥 Surat Masuk
//               </button>
//               <div className={`submenu ${submenuOpen.masuk ? 'show' : ''}`}>
//                 <button className="submenu-item" onClick={() => window.location.href = '/TambahSuratMasuk'}>
//                   ➕ Tambah Surat Masuk
//                 </button>
//                 <button className="submenu-item" onClick={() => window.location.href = '/ListSuratMasuk'}>
//                   📄 List Surat Masuk
//                 </button>
//               </div>
//             </div>

//             <div className="menu-group">
//               <button className="menu-item" onClick={() => toggleSubmenu('keluar')}>
//                 📤 Surat Keluar
//               </button>
//               <div className={`submenu ${submenuOpen.keluar ? 'show' : ''}`}>
//                 <button className="submenu-item" onClick={() => window.location.href = '/TambahSuratKeluar'}>
//                   ➕ Tambah Surat Keluar
//                 </button>
//                 <button className="submenu-item" onClick={() => window.location.href = '/ListSuratKeluar'}>
//                   📄 List Surat Keluar
//                 </button>
//               </div>
//             </div>

//             <button className="menu-item" onClick={() => window.location.href = '/PencarianSurat'}>
//               🔎 Pencarian Surat
//             </button>
//           </nav>

//           <div className="user-section">
//             <p>User</p>
//             <button className="logout-button" onClick={() => {
//               localStorage.removeItem('user');
//               localStorage.removeItem('token');
//               window.location.href = '/';
//             }}>
//               <span>⏻</span> Keluar
//             </button>
//           </div>
//         </aside>

//         <main className="main-content" id="mainContent">
//           <div className="cards">
//             <div className="card blue">
//               <img src="https://img.icons8.com/ios-filled/50/000000/new-post.png" alt="Total surat" />
//               <h3>Total surat</h3>
//               <p className="count">{jumlahMasuk + jumlahKeluar}</p>
//             </div>
//             <div className="card green">
//               <img src="https://img.icons8.com/ios-filled/50/000000/inbox.png" alt="Surat masuk" />
//               <h3>Surat masuk</h3>
//               <p className="count">{jumlahMasuk}</p>
//             </div>
//             <div className="card orange">
//               <img src="https://img.icons8.com/ios-filled/50/000000/outbox.png" alt="Surat keluar" />
//               <h3>Surat keluar</h3>
//               <p className="count">{jumlahKeluar}</p> testes
//             </div>
//           </div>

//           <div className="welcome-box">
//             <h4>Dashboard</h4>
//             <p>Selamat datang, {namaUser}</p> testes
//           </div>
//         </main>
//       </div> cobacoba
//     </>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState({
    masuk: false,
    keluar: false
  });
  const [jumlahMasuk, setJumlahMasuk] = useState(0);
  const [jumlahKeluar, setJumlahKeluar] = useState(0);
  const [namaUser, setNamaUser] = useState('');

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    // console.log('Base URL:', process.env.REACT_APP_URL_BASE);

    // Ambil jumlah surat masuk
    fetch(`${process.env.REACT_APP_URL_BASE}/api/masuk/jumlah/surat`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Gagal mengambil surat masuk');
        return res.json();
      })
      .then(data => setJumlahMasuk(data.count))
      .catch(err => console.error(err));

    // Ambil jumlah surat keluar
    fetch(`${process.env.REACT_APP_URL_BASE}/api/keluar/jumlah/surat`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Gagal mengambil surat keluar');
        return res.json();
      })
      .then(data => setJumlahKeluar(data.count))
      .catch(err => console.error(err));

    // Ambil nama user dari localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setNamaUser(user.nama);
      } catch (e) {
        console.error('Gagal membaca user dari localStorage', e);
      }
    }
  }, []);

  const toggleSubmenu = (type) => {
    const updated = {
      ...submenuOpen,
      [type]: !submenuOpen[type]
    };
    setSubmenuOpen(updated);

    fetch('https://your-backend-url.com/api/log-submenu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        submenuId: `submenu-${type}`,
        opened: updated[type],
        timestamp: new Date().toISOString()
      })
    }).catch(console.error);
  };

  return (
    <>
      <header className="header">
        <div className="menu-toggle" onClick={toggleSidebar}>☰</div>
        <div className="app-title">ArsipNow</div>
      </header>

      <div className="container">
        <aside className={`sidebar ${!sidebarVisible ? 'hide' : ''}`}>
          <div className="profile" onClick={() => window.location.href = '/Profil'}>
            <div className="profile-photo"></div>
            <div className="profile-info">
              <p>Nama {namaUser}</p>
              <p>Jabatan Admin</p>
            </div>
          </div>

          <nav className="menu">
            <button className="menu-item active" onClick={() => window.location.href = '/Dashboard'}>
              🏠 Dashboard
            </button>

            <div className="menu-group">
              <button className="menu-item" onClick={() => toggleSubmenu('masuk')}>
                📥 Surat Masuk
              </button>
              <div className={`submenu ${submenuOpen.masuk ? 'show' : ''}`}>
                <button className="submenu-item" onClick={() => window.location.href = '/TambahSuratMasuk'}>
                  ➕ Tambah Surat Masuk
                </button>
                <button className="submenu-item" onClick={() => window.location.href = '/ListSuratMasuk'}>
                  📄 List Surat Masuk
                </button>
              </div>
            </div>

            <div className="menu-group">
              <button className="menu-item" onClick={() => toggleSubmenu('keluar')}>
                📤 Surat Keluar
              </button>
              <div className={`submenu ${submenuOpen.keluar ? 'show' : ''}`}>
                <button className="submenu-item" onClick={() => window.location.href = '/TambahSuratKeluar'}>
                  ➕ Tambah Surat Keluar
                </button>
                <button className="submenu-item" onClick={() => window.location.href = '/ListSuratKeluar'}>
                  📄 List Surat Keluar
                </button>
              </div>
            </div>

            <button className="menu-item" onClick={() => window.location.href = '/PencarianSurat'}>
              🔎 Pencarian Surat
            </button>
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

        <main className="main-content" id="mainContent">
          <div className="cards">
            <div className="card blue">
              <img src="https://img.icons8.com/ios-filled/50/000000/new-post.png" alt="Total surat" />
              <h3>Total surat</h3>
              <p className="count">{jumlahMasuk + jumlahKeluar}</p>
            </div>
            <div className="card green">
              <img src="https://img.icons8.com/ios-filled/50/000000/inbox.png" alt="Surat masuk" />
              <h3>Surat masuk</h3>
              <p className="count">{jumlahMasuk}</p>
            </div>
            <div className="card orange">
              <img src="https://img.icons8.com/ios-filled/50/000000/outbox.png" alt="Surat keluar" />
              <h3>Surat keluar</h3>
              <p className="count">{jumlahKeluar}</p>
            </div>
          </div>

          <div className="welcome-box">
            <h4>Dashboard</h4>
            <p>Selamat datang, {namaUser}</p>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
