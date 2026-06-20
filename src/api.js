const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

export const fetchPosts = async (page = 1) => {
  const res = await fetch(`${BASE_URL}/posts?page=${page}`);
  return res.json();
};

export const fetchPost = async (slug) => {
  const res = await fetch(`${BASE_URL}/posts/${slug}`);
  return res.json();
};

export const createPost = async (data, token) => {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updatePost = async (id, data, token) => {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deletePost = async (id, token) => {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const fetchAffiliates = async () => {
  const res = await fetch(`${BASE_URL}/affiliates`);
  return res.json();
};

export const createAffiliate = async (data, token) => {
  const res = await fetch(`${BASE_URL}/affiliates`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateAffiliate = async (id, data, token) => {
  const res = await fetch(`${BASE_URL}/affiliates/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteAffiliate = async (id, token) => {
  const res = await fetch(`${BASE_URL}/affiliates/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const loginAdmin = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const fetchAdminStats = async (token) => {
  const res = await fetch(`${BASE_URL}/admin/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const uploadImage = async (file, token) => {
  const formData = new FormData();
  formData.append('image', file);
  const res = await fetch('http://localhost:5001/api/upload.php', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  return res.json();
};

export const fetchComments = async (postId) => {
  const res = await fetch(`${BASE_URL}/comments?post_id=${postId}`);
  return res.json();
};

export const addComment = async (data) => {
  const res = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const fetchAllComments = async (token) => {
  const res = await fetch(`${BASE_URL}/comments/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const deleteComment = async (id, token) => {
  const res = await fetch(`${BASE_URL}/comments/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const updateCommentStatus = async (id, status, token) => {
  const res = await fetch(`${BASE_URL}/comments/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  return res.json();
};

export const trackAffiliateClick = async (id) => {
  const res = await fetch(`${BASE_URL}/affiliates/click/${id}`, {
    method: 'POST',
  });
  return res.json();
};
