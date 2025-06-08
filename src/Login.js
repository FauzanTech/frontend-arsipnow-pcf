// import React, { useState } from 'react';
// import './Login.css';
// import { useNavigate } from 'react-router-dom';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleTogglePassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch('http://localhost:5000/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email, password })
//       });

//       const data = await response.json();

//       // Validasi login berdasarkan respons backend
//       if (!response.ok || !data.success) {
//         throw new Error(data.message || 'Email atau password salah');
//       }

//       // Login berhasil, arahkan ke dashboard
//       navigate('/dashboard');
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div>
//       {/* Background Image */}
//       <img
//         src="background.png"
//         alt="Background"
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           objectFit: 'cover',
//           zIndex: -1
//         }}
//       />

//       <div className="login-container">
//         <div className="login-box">
//           <img src="Login.png" alt="Logo" className="logo" />
//           <h2>ArsipNow</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="input-group">
//               <input
//                 type="text"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <span className="icon">👤</span>
//             </div>
//             <div className="input-group">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <span className="icon" onClick={handleTogglePassword}>👁️</span>
//             </div>
//             <button type="submit" className="login-button">Login</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.URL_BASE}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      // Validasi login berdasarkan respons backend
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Email atau password salah');
      }

      // ✅ Simpan token dan data user ke localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // ✅ Arahkan ke dashboard
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      {/* Background Image */}
      <img
        src="background.png"
        alt="Background"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1
        }}
      />

      <div className="login-container">
        <div className="login-box">
          <img src="Login.png" alt="Logo" className="logo" />
          <h2>ArsipNow</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="icon">👤</span>
            </div>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="icon" onClick={handleTogglePassword}>👁️</span>
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
