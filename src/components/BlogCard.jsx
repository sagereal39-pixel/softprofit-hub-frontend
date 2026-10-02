import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function BlogCard({ post }) {
  const [imgError, setImgError] = useState(false);
  const hasImage = Boolean(post.featured_image) && !imgError;

  const date = post.created_at
    ? post.created_at.split(' ')[0]
    : post.date || '';
  const commentCount = post.comment_count || post.comments || 0;

  return (
    <div className='blog-card'>
      {hasImage ? (
        <img
          src={post.featured_image}
          alt={post.title}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className='blog-card-placeholder' aria-hidden='true'>
          <span>{post.category || 'Softprofit Hub'}</span>
        </div>
      )}
      <div className='blog-card-body'>
        <h2>{post.title}</h2>
        <p className='blog-card-meta'>
          {post.author} · {date}
        </p>
        <p>{post.excerpt}</p>
        <div className='blog-card-footer'>
          <Link to={`/blog/${post.slug}`} className='read-more'>
            READ MORE &gt;&gt;
          </Link>
          <span className='comments'>💬 Comments {commentCount}</span>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;