import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditSuratKeluar.css';

const EditSuratKeluar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    no_surat: '',
    tgl_surat: '',
    tujuan: '',
    perihal: '',
    penandatangan: '',
  });

  const [existingFile, setExistingFile] = useState('');
  const [fileSurat, setFileSurat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${process.env.REACT_APP_URL_BASE}/api/keluar/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => res.json())
      .then(data => {
        setFormData({
          no_surat: data.no_surat || '',
          tgl_surat: data.tgl_surat || '',
          tujuan: data.tujuan || '',
          perihal: data.perihal || '',
          penandatangan: data.penandatangan || '',
        });
        setExistingFile(data.file_surat?.split(/[\\/]/).pop() || '');
        setLoading(false);
      })
      .catch(err => {
        alert('Gagal memuat data surat.');
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFileSurat(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();

    for (let key in formData) {
      form.append(key, formData[key]);
    }

    if (fileSurat) {
      form.append('file_surat', fileSurat);
    }

    const token = localStorage.getItem('token');

    fetch(`${process.env.REACT_APP_URL_BASE}/api/keluar/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      body: form
    })
      .then(res => {
        if (!res.ok) throw new Error('Gagal memperbarui surat.');
        return res.json();
      })
      .then(() => {
        alert('Data surat keluar berhasil diperbarui.');
        navigate('/ListSuratKeluar');
      })
      .catch(err => {
        alert(err.message);
        console.error(err);
      });
  };

  const handleCancel = () => {
    navigate('/ListSuratKeluar');
  };

  if (loading) return <p>Memuat data...</p>;

  return (
    <div className="edit-container">
      <h1>Edit Surat Keluar</h1>
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-group">
          <label>Nomor Surat</label>
          <input
            type="text"
            name="no_surat"
            value={formData.no_surat}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Tanggal Surat</label>
          <input
            type="date"
            name="tgl_surat"
            value={formData.tgl_surat}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Tujuan</label>
          <input
            type="text"
            name="tujuan"
            value={formData.tujuan}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Perihal</label>
          <input
            type="text"
            name="perihal"
            value={formData.perihal}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Penandatangan</label>
          <input
            type="text"
            name="penandatangan"
            value={formData.penandatangan}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>File Surat (opsional)</label>
          <input
            type="file"
            name="file_surat"
            onChange={handleFileChange}
          />
          {existingFile && !fileSurat && (
            <p>
              File saat ini:{' '}
              <a href={`${process.env.REACT_APP_URL_BASE}/uploads/${existingFile}`} target="_blank" rel="noreferrer">
                {existingFile}
              </a>
            </p>
          )}
        </div>
        <div className="button-group">
          <button type="submit">Simpan Perubahan</button>
          <button type="button" onClick={handleCancel} className="cancel-button">
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSuratKeluar;
