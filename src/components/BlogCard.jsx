import React from 'react';
import { Link } from 'react-router-dom';

function BlogCard({ post }) {
  const placeholders = [
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800',
    'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800',
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800',
  ];
  const image =
    post.featured_image || placeholders[post.id % placeholders.length];
  const date = post.created_at
    ? post.created_at.split(' ')[0]
    : post.date || '';
  const commentCount = post.comment_count || post.comments || 0;

  return (
    <div className='blog-card'>
      <img src={image} alt={post.title} />
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
