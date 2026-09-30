import React, { useState, useEffect, useRef } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import {
  fetchPosts,
  deletePost,
  createPost,
  updatePost,
  uploadImage,
} from '../api';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function ManagePosts() {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('published');
  const [showForm, setShowForm] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef();

  const [form, setForm] = useState({
    title: '',
    category: '',
    status: 'draft',
    excerpt: '',
    content: '',
    author: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    featured_image: '',
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/admin/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const adminPosts = await res.json();
      setAllPosts(Array.isArray(adminPosts) ? adminPosts : []);
    } catch {
      setAllPosts([]);
    }
    setLoading(false);
  };

  const published = allPosts.filter((p) => p.status === 'published');
  const drafts = allPosts.filter((p) => p.status === 'draft');
  const displayPosts = activeTab === 'published' ? published : drafts;

  const handleDelete = async (id) => {
    if (window.confirm('Delete this post?')) {
      await deletePost(id, token);
      loadPosts();
    }
  };

  const handlePublish = async (post) => {
    await updatePost(post.id, { ...post, status: 'published' }, token);
    loadPosts();
  };

  const handleEdit = (post) => {
    setEditPost(post);
    setForm({
      title: post.title || '',
      category: post.category || '',
      status: post.status || 'draft',
      excerpt: post.excerpt || '',
      content: post.content || '',
      author: post.author || '',
      meta_title: post.meta_title || '',
      meta_description: post.meta_description || '',
      meta_keywords: post.meta_keywords || '',
      featured_image: post.featured_image || '',
    });
    setImagePreview(post.featured_image || '');
    setShowForm(true);
  };

  const handleNew = () => {
    setEditPost(null);
    setForm({
      title: '',
      category: '',
      status: 'draft',
      excerpt: '',
      content: '',
      author: '',
      meta_title: '',
      meta_description: '',
      meta_keywords: '',
      featured_image: '',
    });
    setImagePreview('');
    setShowForm(true);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const data = await uploadImage(file, token);
      if (data.url) {
        setForm((f) => ({ ...f, featured_image: data.url }));
        setImagePreview(data.url);
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch {
      alert('Image upload failed. Check XAMPP is running.');
    }
    setUploading(false);
  };

  const handleSave = async () => {
    if (!form.title) {
      alert('Title is required.');
      return;
    }
    setSaving(true);
    try {
      if (editPost) {
        await updatePost(editPost.id, form, token);
      } else {
        await createPost(form, token);
      }
      setShowForm(false);
      setEditPost(null);
      setImagePreview('');
      loadPosts();
    } catch {
      alert('Failed to save.');
    }
    setSaving(false);
  };

  return (
    <div className='admin-layout'>
      <AdminSidebar />
      <div className='admin-main'>
        <div className='admin-header'>
          <div>
            <h1>Manage Posts</h1>
            <p>Create, edit, publish or delete blog posts</p>
          </div>
          <button className='admin-btn' onClick={handleNew}>
            + New Post
          </button>
        </div>

        {/* Post Form */}
        {showForm && (
          <div className='admin-card'>
            <h3>{editPost ? 'Edit Post' : 'New Post'}</h3>
            <div className='admin-form'>
              {[
                ['title', 'Title', 'Post title'],
                ['author', 'Author', 'Author name'],
                ['meta_title', 'Meta Title', 'SEO title'],
                ['meta_keywords', 'Meta Keywords', 'keyword1, keyword2'],
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

              <div className='form-group'>
                <label>Category</label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                >
                  <option value=''>-- Select Category --</option>
                  <option value='AI Tools'>AI Tools</option>
                  <option value='Design'>Design</option>
                  <option value='Marketing'>Marketing</option>
                  <option value='SaaS'>SaaS</option>
                  <option value='E-Learning'>E-Learning</option>
                  <option value='Productivity'>Productivity</option>
                  <option value='SEO Tools'>SEO Tools</option>
                  <option value='Copywriting'>Copywriting</option>
                </select>
              </div>

              <div className='form-group'>
                <label>Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value='draft'>Draft</option>
                  <option value='published'>Published</option>
                </select>
              </div>

              {/* Image Upload */}
              <div className='form-group' style={{ gridColumn: 'span 2' }}>
                <label>Featured Image</label>
                <div
                  className='image-upload-area'
                  onClick={() => fileInputRef.current.click()}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt='Preview'
                      className='image-preview'
                    />
                  ) : (
                    <div className='image-upload-placeholder'>
                      <span style={{ fontSize: 32 }}>🖼️</span>
                      <p>
                        {uploading ? 'Uploading...' : 'Click to upload image'}
                      </p>
                      <small>JPG, PNG, GIF, WEBP — Max 5MB</small>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                {imagePreview && (
                  <button
                    onClick={() => {
                      setImagePreview('');
                      setForm((f) => ({ ...f, featured_image: '' }));
                    }}
                    style={{
                      marginTop: 8,
                      background: 'none',
                      border: '1px solid #ccc',
                      padding: '4px 12px',
                      borderRadius: 4,
                      fontSize: 12,
                      cursor: 'pointer',
                      color: '#c81e1e',
                    }}
                  >
                    Remove Image
                  </button>
                )}
              </div>

              <div className='form-group' style={{ gridColumn: 'span 2' }}>
                <label>Excerpt</label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) =>
                    setForm({ ...form, excerpt: e.target.value })
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

              <div className='form-group' style={{ gridColumn: 'span 2' }}>
                <label>Content</label>

                {/* Inline Image Inserter */}
                <div className='ck-image-inserter'>
                  <span
                    style={{ fontSize: 13, color: '#555', fontWeight: 600 }}
                  >
                    📷 Insert image into content:
                  </span>
                  <div
                    style={{
                      display: 'flex',
                      gap: 8,
                      marginTop: 6,
                      flexWrap: 'wrap',
                      alignItems: 'center',
                    }}
                  >
                    <input
                      type='file'
                      accept='image/*'
                      id='ck-img-upload'
                      style={{ display: 'none' }}
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        const width =
                          document.getElementById('ck-img-width').value ||
                          '100';
                        const align =
                          document.getElementById('ck-img-align').value ||
                          'center';
                        const token = localStorage.getItem('token');
                        const formData = new FormData();
                        formData.append('image', file);
                        try {
                          const res = await fetch(
                            'http://localhost:5001/api/upload.php',
                            {
                              method: 'POST',
                              headers: { Authorization: `Bearer ${token}` },
                              body: formData,
                            },
                          );
                          const data = await res.json();
                          if (data.url) {
                            const imgHtml = `<figure style="text-align:${align};margin:20px 0;">
              <img src="${data.url}" alt="" style="width:${width}%;max-width:100%;height:auto;border-radius:4px;"/>
            </figure>`;
                            setForm((f) => ({
                              ...f,
                              content: f.content + imgHtml,
                            }));
                          } else {
                            alert(
                              'Upload failed: ' +
                                (data.error || 'Unknown error'),
                            );
                          }
                        } catch {
                          alert('Upload failed. Is XAMPP running?');
                        }
                        e.target.value = '';
                      }}
                    />

                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                    >
                      <label
                        style={{ fontSize: 12, color: '#666', fontWeight: 600 }}
                      >
                        Width:
                      </label>
                      <input
                        id='ck-img-width'
                        type='number'
                        defaultValue='100'
                        min='10'
                        max='100'
                        style={{
                          width: 64,
                          padding: '6px 8px',
                          border: '1px solid #ccc',
                          borderRadius: 4,
                          fontSize: 13,
                        }}
                      />
                      <span style={{ fontSize: 12, color: '#888' }}>%</span>
                    </div>

                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                    >
                      <label
                        style={{ fontSize: 12, color: '#666', fontWeight: 600 }}
                      >
                        Align:
                      </label>
                      <select
                        id='ck-img-align'
                        style={{
                          padding: '6px 10px',
                          border: '1px solid #ccc',
                          borderRadius: 4,
                          fontSize: 13,
                        }}
                      >
                        <option value='center'>Center</option>
                        <option value='left'>Left</option>
                        <option value='right'>Right</option>
                      </select>
                    </div>

                    <button
                      type='button'
                      onClick={() =>
                        document.getElementById('ck-img-upload').click()
                      }
                      style={{
                        background: '#111',
                        border: 'none',
                        color: '#fff',
                        padding: '7px 16px',
                        borderRadius: 4,
                        fontSize: 13,
                        cursor: 'pointer',
                        fontWeight: 600,
                      }}
                    >
                      📁 Upload & Insert
                    </button>
                  </div>
                </div>

                <CKEditor
                  editor={ClassicEditor}
                  data={form.content}
                  config={{
                    toolbar: [
                      'heading',
                      '|',
                      'bold',
                      'italic',
                      'underline',
                      '|',
                      'link',
                      '|',
                      'bulletedList',
                      'numberedList',
                      '|',
                      'blockQuote',
                      '|',
                      'insertTable',
                      '|',
                      'mediaEmbed',
                      '|',
                      'undo',
                      'redo',
                    ],
                  }}
                  onChange={(event, editor) => {
                    setForm((f) => ({ ...f, content: editor.getData() }));
                  }}
                />
              </div>

              <div className='form-group' style={{ gridColumn: 'span 2' }}>
                <label>Meta Description</label>
                <textarea
                  value={form.meta_description}
                  onChange={(e) =>
                    setForm({ ...form, meta_description: e.target.value })
                  }
                  placeholder='SEO description...'
                  rows={2}
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
                  disabled={saving || uploading}
                >
                  {saving ? 'Saving...' : 'Save Post'}
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

        {/* Tabs */}
        <div className='posts-tabs'>
          <button
            className={`posts-tab ${activeTab === 'published' ? 'active' : ''}`}
            onClick={() => setActiveTab('published')}
          >
            Published <span className='tab-count'>{published.length}</span>
          </button>
          <button
            className={`posts-tab ${activeTab === 'drafts' ? 'active' : ''}`}
            onClick={() => setActiveTab('drafts')}
          >
            Drafts <span className='tab-count drafts'>{drafts.length}</span>
          </button>
        </div>

        {/* Table */}
        <div className='admin-card'>
          {loading ? (
            <p className='loading'>Loading posts...</p>
          ) : displayPosts.length === 0 ? (
            <p style={{ color: '#888', fontSize: 14, padding: 8 }}>
              No {activeTab} posts yet.
            </p>
          ) : (
            <table className='admin-table'>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Views</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayPosts.map((post) => (
                  <tr key={post.id}>
                    <td>
                      {post.featured_image ? (
                        <img
                          src={post.featured_image}
                          alt=''
                          style={{
                            width: 60,
                            height: 40,
                            objectFit: 'cover',
                            borderRadius: 4,
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: 60,
                            height: 40,
                            background: '#f0f0f0',
                            borderRadius: 4,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 18,
                          }}
                        >
                          🖼️
                        </div>
                      )}
                    </td>
                    <td>{post.title}</td>
                    <td>{post.category}</td>
                    <td>
                      <span className={`status-badge ${post.status}`}>
                        {post.status}
                      </span>
                    </td>
                    <td>{(post.views || 0).toLocaleString()}</td>
                    <td>{post.created_at?.split(' ')[0]}</td>
                    <td className='action-btns'>
                      <button
                        className='btn-edit'
                        onClick={() => handleEdit(post)}
                      >
                        Edit
                      </button>
                      {post.status === 'draft' && (
                        <button
                          className='btn-publish'
                          onClick={() => handlePublish(post)}
                        >
                          Publish
                        </button>
                      )}
                      <button
                        className='btn-delete'
                        onClick={() => handleDelete(post.id)}
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

export default ManagePosts;