import styles from './Ambients.module.css';
import { useState, useEffect, use } from 'react';
import axios from 'axios';
import { Modal } from '../Modal/Modal';
import api from '../../api/axios';
import { set, z } from 'zod';
import Loading from '../Components-Uiverse/Loading/Loading';

import { Pencil, Plus, Trash2, Download } from 'lucide-react';
import ButtonBackToTop from '../Components-Uiverse/ButtonBackToTop/ButtonBackToTop';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const ambientSchema = z.object({
  sig: z
    .string()
    .regex(/^[0-9]{8}$/, 'SIG must contain exactly 8 digits.'),
  descricao: z
    .string()
    .max(100, 'Description must be at most 100 characters long.')
    .optional()
    .or(z.literal('').transform(() => undefined)),
  ni: z
    .string()
    .regex(/^(SN\d{5}|\d{7})$/, 'NI must be in the format SNXXXXX or XXXXXXX (digits only).')
    .optional()
    .or(z.literal('').transform(() => undefined)),
  responsavel: z
    .string()
    .max(100, 'Responsible must be at most 100 characters long.')
    .optional()
    .or(z.literal('').transform(() => undefined)),
});

export function Ambients() {
  const [ambients, setAmbients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editAmbientId, setEditAmbientId] = useState(null);
  const [formData, setFormData] = useState({
    sig: '',
    descricao: '',
    ni: '',
    responsavel: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('access');

    api
      .get('http://127.0.0.1:8000/api/ambients/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTimeout(() => {
          setAmbients(response.data.ambients || response.data);
          setLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.error('Erro ao buscar ambientes: ', error);
        setLoading(false);
      });
  }, []);

  const resetForm = () => {
    setFormData({ sig: '', descricao: '', ni: '', responsavel: '' });
    setShowModal(false);
    setIsEditing(false);
    setEditAmbientId(null);
  };

  const handleOpenEdit = (ambient) => {
    setFormData(ambient);
    setEditAmbientId(ambient.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access');

    const url = isEditing
      ? `http://127.0.0.1:8000/api/ambients/${editAmbientId}/`
      : 'http://127.0.0.1:8000/api/ambients/';

    const method = isEditing ? api.put : api.post;

    method(url, formData, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (isEditing) {
          setAmbients((prev) =>
            prev.map((a) => (a.id === editAmbientId ? res.data : a))
          );
        } else {
          setAmbients((prev) => [...prev, res.data]);
        }
        resetForm();
      })
      .catch((err) => {
        console.error('Erro ao salvar ambiente:', err);
      });
  };

  const handleDelete = (id) => {
    MySwal.fire({
      title: "You're sure?",
      text: "You can't reverse this action!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('access');
        axios
          .delete(`http://127.0.0.1:8000/api/ambients/${id}/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            setAmbients((prev) => prev.filter((ambient) => ambient.id !== id));
            Swal.fire('Deleted!', 'The ambient has been removed.', 'success');
          })
          .catch((error) => {
            console.error('Error deleting ambient: ', error);
            Swal.fire('Error', 'The ambient could not be deleted.', 'error');
          });
      }
    });
  };

  const handleExportToExcel = () => {
    const token = localStorage.getItem('access');

    axios
      .get('http://127.0.0.1:8000/api/export/ambients/', {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'ambients.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        console.error('Error when exporting to Excel:', error);
        Swal.fire('Error', 'The data could not be exported.', 'error');
      });
  };

  if (loading) {
    return <Loading className={styles.loadingContainer} />;
  }

  return (
    <div className={styles.center}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Ambients</h1>
          <div className={styles.functionalitiesHeader}>
            <button className={styles.addButton} onClick={() => setShowModal(true)}>
              <Plus /> Add Ambient
            </button>
            <button className={styles.exportButton} onClick={handleExportToExcel}>
              <Download /> Export to Excel
            </button>
          </div>
        </div>

        <div className={styles.list}>
          {ambients.map((ambient) => (
            <div className={styles.card} key={ambient.id}>
              <h2>{ambient.sig}</h2>
              <p>
                <strong>Description:</strong> {ambient.descricao || 'N/A'}
              </p>
              <p>
                <strong>NI:</strong> {ambient.ni || 'N/A'}
              </p>
              <p>
                <strong>Responsible:</strong> {ambient.responsavel || 'N/A'}
              </p>
              <div className={styles.actions}>
                <button
                  onClick={() => handleDelete(ambient.id)}
                  className={`${styles.iconButton} ${styles.iconTrash}`}
                >
                  <Trash2 />
                </button>
                <button
                  onClick={() => handleOpenEdit(ambient)}
                  className={`${styles.iconButton} ${styles.iconPencil}`}
                >
                  <Pencil />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        title={isEditing ? 'Edit Ambient' : 'Register New Ambient'}
        isOpen={showModal}
        onClose={resetForm}
      >
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            SIG:
            <input
              placeholder='Ex.: XXXXXXXX'
              className={styles.inputModal}
              value={formData.sig}
              onChange={(e) => setFormData({ ...formData, sig: e.target.value })}
              required
            />
          </label>
          <label className={styles.label}>
            Description:
            <input
              placeholder='Type here...'
              className={styles.inputModal}
              value={formData.descricao || ''}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
            />
          </label>
          <label className={styles.label}>
            NI:
            <input
              placeholder='Ex.: SNXXXXX or XXXXXXX'
              className={styles.inputModal}
              value={formData.ni || ''}
              onChange={(e) => setFormData({ ...formData, ni: e.target.value })}
            />
          </label>
          <label className={styles.label}>
            Responsible:
            <input
              placeholder='Type here...'
              className={styles.inputModal}
              value={formData.responsavel || ''}
              onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
            />
          </label>
          <button className={styles.button} type="submit">
            {isEditing ? 'Save' : 'Register'}
          </button>
        </form>
      </Modal>

      <ButtonBackToTop />
    </div>
  );
}
