import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditSuratMasuk.css';

const EditSuratMasuk = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    no_surat: '',
    tgl_surat: '',
    tgl_diterima: '',
    pengirim: '',
    perihal: '',
  });

  const [existingFile, setExistingFile] = useState('');
  const [fileSurat, setFileSurat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${process.env.REACT_APP_URL_BASE}/api/masuk/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setFormData({
          no_surat: data.no_surat || '',
          tgl_surat: data.tgl_surat || '',
          tgl_diterima: data.tgl_diterima || '',
          pengirim: data.pengirim || '',
          perihal: data.perihal || '',
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
    fetch(`${process.env.REACT_APP_URL_BASE}/api/masuk/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    })
      .then(res => {
        if (!res.ok) throw new Error('Gagal memperbarui surat.');
        return res.json();
      })
      .then(() => {
        alert('Data surat berhasil diperbarui.');
        navigate('/ListSuratMasuk');
      })
      .catch(err => {
        alert(err.message);
        console.error(err);
      });
  };

  const handleCancel = () => {
    navigate('/ListSuratMasuk');
  };

  if (loading) return <p>Memuat data...</p>;

  return (
    <div className="edit-container">
      <h1>Edit Surat Masuk</h1>
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
          <label>Tanggal Diterima</label>
          <input
            type="date"
            name="tgl_diterima"
            value={formData.tgl_diterima}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Pengirim</label>
          <input
            type="text"
            name="pengirim"
            value={formData.pengirim}
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
          <label>File Surat (opsional)</label>
          <input
            type="file"
            name="file_surat"
            onChange={handleFileChange}
          />
          {existingFile && (
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

export default EditSuratMasuk;
