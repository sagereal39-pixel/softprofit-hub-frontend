import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import {
  fetchAffiliates,
  createAffiliate,
  updateAffiliate,
  deleteAffiliate,
} from '../api';

function ManageAffiliates() {
  const [affiliates, setAffiliates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editAff, setEditAff] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '',
    url: '',
    category: '',
    commission: '',
    description: '',
    logo: '',
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    loadAffiliates();
  }, []);

  const loadAffiliates = async () => {
    setLoading(true);
    try {
      const data = await fetchAffiliates();
      setAffiliates(Array.isArray(data) ? data : []);
    } catch {
      setAffiliates([]);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this affiliate?')) {
      await deleteAffiliate(id, token);
      loadAffiliates();
    }
  };

  const handleEdit = (aff) => {
    setEditAff(aff);
    setForm({
      name: aff.name || '',
      url: aff.url || '',
      category: aff.category || '',
      commission: aff.commission || '',
      description: aff.description || '',
      logo: aff.logo || '',
    });
    setShowForm(true);
  };

  const handleNew = () => {
    setEditAff(null);
    setForm({
      name: '',
      url: '',
      category: '',
      commission: '',
      description: '',
      logo: '',
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.url) {
      alert('Name and URL are required.');
      return;
    }
    setSaving(true);
    try {
      if (editAff) {
        await updateAffiliate(editAff.id, form, token);
      } else {
        await createAffiliate(form, token);
      }
      setShowForm(false);
      setEditAff(null);
      loadAffiliates();
    } catch {
      alert('Failed to save. Check your connection.');
    }
    setSaving(false);
  };

  return (
    <div className='admin-layout'>
      <AdminSidebar />
      <div className='admin-main'>
        <div className='admin-header'>
          <div>
            <h1>Manage Affiliates</h1>
            <p>Track and manage your affiliate links</p>
          </div>
          <button className='admin-btn' onClick={handleNew}>
            + New Affiliate
          </button>
        </div>

        {showForm && (
          <div className='admin-card'>
            <h3>{editAff ? 'Edit Affiliate' : 'New Affiliate'}</h3>
            <div className='admin-form'>
              {[
                ['name', 'Name', 'e.g. Jasper AI'],
                ['url', 'Affiliate URL', 'https://...'],
                ['category', 'Category', 'e.g. AI Tools'],
                ['commission', 'Commission (%)', '30'],
                ['logo', 'Logo URL (optional)', 'https://...'],
              ].map(([key, label, placeholder]) => (
                <div className='form-group' key={key}>
                  <label>{label}</label>
                  <input
                    value={form[key]}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value })
                    }
                    placeholder={placeholder}
                  />
                </div>
              ))}
              <div className='form-group' style={{ gridColumn: 'span 2' }}>
                <label>Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder='Short description...'
                  rows={3}
                  style={{
                    padding: '9px 12px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '13px',
                    resize: 'vertical',
                    width: '100%',
                  }}
                />
              </div>
              <div className='form-actions'>
                <button
                  className='admin-btn'
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button
                  className='admin-btn-outline'
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className='admin-card'>
          {loading ? (
            <p className='loading'>Loading affiliates...</p>
          ) : affiliates.length === 0 ? (
            <p style={{ color: '#888', fontSize: 14 }}>
              No affiliates yet. Add your first one!
            </p>
          ) : (
            <table className='admin-table'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Commission</th>
                  <th>Clicks</th>
                  <th>URL</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {affiliates.map((aff) => (
                  <tr key={aff.id}>
                    <td>{aff.name}</td>
                    <td>{aff.category}</td>
                    <td>{aff.commission}%</td>
                    <td>{aff.clicks || 0}</td>
                    <td>
                      <a
                        href={aff.url}
                        target='_blank'
                        rel='noreferrer'
                        style={{ color: '#1a56db', fontSize: 13 }}
                      >
                        Visit ↗
                      </a>
                    </td>
                    <td className='action-btns'>
                      <button
                        className='btn-edit'
                        onClick={() => handleEdit(aff)}
                      >
                        Edit
                      </button>
                      <button
                        className='btn-delete'
                        onClick={() => handleDelete(aff.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageAffiliates;
