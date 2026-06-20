import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ onTagClick, activeTag }) {
  const [popularPosts, setPopularPosts] = useState([]);
  const [tags, setTags] = useState([]);

  const placeholders = [
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=120&fit=crop',
    'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=200&h=120&fit=crop',
    'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=200&h=120&fit=crop',
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=200&h=120&fit=crop',
  ];

  useEffect(() => {
    // Fetch popular posts sorted by views
    fetch('http://localhost:5001/api/posts/popular')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setPopularPosts(data);
      })
      .catch(() => {});

    // Fetch tags from all posts
    fetch('http://localhost:5001/api/posts')
      .then((r) => r.json())
      .then((data) => {
        if (data.posts) {
          const cats = [
            ...new Set(data.posts.map((p) => p.category).filter(Boolean)),
          ];
          setTags(cats);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <aside>
      <div className='sidebar-section'>
        <h3>Popular Posts</h3>
        {popularPosts.length === 0 ? (
          <p style={{ padding: '12px 16px', color: '#888', fontSize: 13 }}>
            No posts yet.
          </p>
        ) : (
          popularPosts.map((post, index) => (
            <Link
              to={`/blog/${post.slug}`}
              key={post.id}
              className='popular-post-item'
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <img
                src={
                  post.featured_image ||
                  placeholders[index % placeholders.length]
                }
                alt={post.title}
              />
              <div>
                <h4>{post.title}</h4>
                <p>{post.excerpt?.substring(0, 60)}...</p>
              </div>
            </Link>
          ))
        )}
      </div>

      <div className='sidebar-section'>
        <h3>Tags</h3>
        <div className='tags-grid'>
          {tags.length === 0 ? (
            <span style={{ color: '#888', fontSize: 13 }}>No tags yet.</span>
          ) : (
            tags.map((tag, index) => (
              <button
                key={index}
                className={`tag ${activeTag === tag ? 'tag-active' : ''}`}
                onClick={() => onTagClick && onTagClick(tag)}
                style={{ border: 'none', cursor: 'pointer' }}
              >
                {tag}
              </button>
            ))
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
