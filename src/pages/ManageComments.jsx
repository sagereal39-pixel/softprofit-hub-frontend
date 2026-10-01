import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { fetchAllComments, deleteComment, updateCommentStatus } from '../api';

function ManageComments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const token = localStorage.getItem('token');

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    setLoading(true);
    try {
      const data = await fetchAllComments(token);
      setComments(Array.isArray(data) ? data : []);
    } catch {
      setComments([]);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this comment?')) {
      await deleteComment(id, token);
      loadComments();
    }
  };

  const handleStatus = async (id, status) => {
    await updateCommentStatus(id, status, token);
    loadComments();
  };

  const filtered =
    filter === 'all' ? comments : comments.filter((c) => c.status === filter);

  return (
    <div className='admin-layout'>
      <AdminSidebar />
      <div className='admin-main'>
        <div className='admin-header'>
          <div>
            <h1>Manage Comments</h1>
            <p>Review, approve or delete comments</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['all', 'approved', 'pending', 'rejected'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '7px 14px',
                  borderRadius: 4,
                  fontSize: 12,
                  cursor: 'pointer',
                  fontWeight: 600,
                  background: filter === f ? '#111' : '#fff',
                  color: filter === f ? '#fff' : '#555',
                  border: '1px solid #ddd',
                }}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className='admin-card'>
          {loading ? (
            <p className='loading'>Loading comments...</p>
          ) : filtered.length === 0 ? (
            <p style={{ color: '#888', fontSize: 14 }}>No comments found.</p>
          ) : (
            <table className='admin-table'>
              <thead>
                <tr>
                  <th>Author</th>
                  <th>Email</th>
                  <th>Post</th>
                  <th>Comment</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 600 }}>{c.name}</td>
                    <td style={{ fontSize: 12, color: '#888' }}>{c.email}</td>
                    <td className='col-post' style={{ fontSize: 12, color: '#555' }}>
                      <span className='truncate truncate-post' title={c.post_title}>
                        {c.post_title}
                      </span>
                    </td>
                    <td className='col-comment' style={{ fontSize: 13 }}>
                      <span className='truncate truncate-comment' title={c.content}>
                        {c.content}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${c.status === 'approved' ? 'published' : c.status === 'pending' ? 'draft' : 'rejected'}`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td style={{ fontSize: 12 }}>
                      {c.created_at?.split(' ')[0]}
                    </td>
                    <td className='action-btns'>
                      {c.status !== 'approved' && (
                        <button
                          className='btn-publish'
                          onClick={() => handleStatus(c.id, 'approved')}
                        >
                          Approve
                        </button>
                      )}
                      {c.status !== 'rejected' && (
                        <button
                          className='btn-edit'
                          onClick={() => handleStatus(c.id, 'rejected')}
                        >
                          Reject
                        </button>
                      )}
                      <button
                        className='btn-delete'
                        onClick={() => handleDelete(c.id)}
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

export default ManageComments;