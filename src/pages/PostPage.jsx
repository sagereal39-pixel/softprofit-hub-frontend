import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import {
  fetchPost,
  fetchComments,
  addComment,
  trackAffiliateClick,
} from '../api';
import SEO from '../components/SEO';

function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentForm, setCommentForm] = useState({
    name: '',
    email: '',
    content: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setImgError(false);
    fetchPost(slug)
      .then((data) => {
        if (data && data.id) {
          setPost(data);
          return fetchComments(data.id);
        }
        return [];
      })
      .then((c) => setComments(Array.isArray(c) ? c : []))
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentForm.name || !commentForm.email || !commentForm.content) return;
    setSubmitting(true);
    try {
      await addComment({ ...commentForm, post_id: post.id });
      setSubmitted(true);
      setCommentForm({ name: '', email: '', content: '' });
      const updated = await fetchComments(post.id);
      setComments(Array.isArray(updated) ? updated : []);
    } catch {
      alert('Failed to submit comment.');
    }
    setSubmitting(false);
  };

  if (loading)
    return (
      <div className='page-layout'>
        <main>
          <p className='loading'>Loading post...</p>
        </main>
        <Sidebar />
      </div>
    );

  if (!post)
    return (
      <div className='not-found'>
        <h2>Post not found.</h2>
        <Link to='/'>← Back to Home</Link>
      </div>
    );

  const hasImage = Boolean(post.featured_image) && !imgError;

  return (
    <div className='page-layout'>
      <SEO
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt}
        keywords={post.meta_keywords}
        image={post.featured_image}
        url={`/blog/${post.slug}`}
        type='article'
        author={post.author}
      />
      <main>
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
            <span className='post-category'>{post.category}</span>
            <h1 className='post-title'>{post.title}</h1>
            <p className='blog-card-meta'>
              {post.author} · {post.created_at?.split(' ')[0]}
            </p>
            <div
              className='post-content ck-content'
              dangerouslySetInnerHTML={{
                __html: post.content || post.excerpt || '',
              }}
            />
            {post.meta_description && (
              <div className='seo-box'>
                <strong>SEO:</strong> {post.meta_description}
              </div>
            )}
            {post.affiliates?.length > 0 && (
              <div className='affiliate-box'>
                <h3>🔗 Recommended Tools</h3>
                {post.affiliates.map((a) => (
                  <div key={a.id} className='affiliate-item'>
                    <div>
                      <strong style={{ fontSize: 14, color: '#111' }}>
                        {a.name}
                      </strong>
                      {a.description && (
                        <p
                          style={{
                            fontSize: 13,
                            color: '#666',
                            margin: '2px 0 0',
                          }}
                        >
                          {a.description}
                        </p>
                      )}
                    </div>
                    <a
                      href={a.url}
                      target='_blank'
                      rel='noreferrer'
                      className='affiliate-cta'
                      onClick={() => trackAffiliateClick(a.id)}
                    >
                      Get {a.commission}% Off →
                    </a>
                  </div>
                ))}
              </div>
            )}
            <div className='post-footer'>
              <button
                onClick={() => navigate(-1)}
                className='read-more'
                style={{ cursor: 'pointer', background: '#fff' }}
              >
                ← Back to Blog
              </button>
              <span className='comments'>Comments {comments.length}</span>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className='comments-section'>
          <h3 className='comments-title'>
            💬 {comments.length} Comment{comments.length !== 1 ? 's' : ''}
          </h3>

          {/* Comment List */}
          {comments.length === 0 ? (
            <p className='no-comments'>Be the first to comment!</p>
          ) : (
            <div className='comments-list'>
              {comments.map((c) => (
                <div key={c.id} className='comment-item'>
                  <div className='comment-avatar'>
                    {c.name.charAt(0).toUpperCase()}
                  </div>
                  <div className='comment-body'>
                    <div className='comment-meta'>
                      <strong>{c.name}</strong>
                      <span>
                        {new Date(c.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <p className='comment-content'>{c.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Comment Form */}
          <div className='comment-form-wrap'>
            <h4>Leave a Comment</h4>
            {submitted && (
              <div className='comment-success'>
                ✅ Comment submitted successfully!
              </div>
            )}
            <form onSubmit={handleCommentSubmit} className='comment-form'>
              <div className='comment-form-row'>
                <div className='comment-form-group'>
                  <label>Name *</label>
                  <input
                    type='text'
                    value={commentForm.name}
                    onChange={(e) =>
                      setCommentForm({ ...commentForm, name: e.target.value })
                    }
                    placeholder='Your name'
                    required
                  />
                </div>
                <div className='comment-form-group'>
                  <label>Email *</label>
                  <input
                    type='email'
                    value={commentForm.email}
                    onChange={(e) =>
                      setCommentForm({ ...commentForm, email: e.target.value })
                    }
                    placeholder='your@email.com'
                    required
                  />
                </div>
              </div>
              <div className='comment-form-group'>
                <label>Comment *</label>
                <textarea
                  value={commentForm.content}
                  onChange={(e) =>
                    setCommentForm({ ...commentForm, content: e.target.value })
                  }
                  placeholder='Write your comment here...'
                  rows={4}
                  required
                />
              </div>
              <button
                type='submit'
                className='comment-submit'
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : 'Post Comment'}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Sidebar />
    </div>
  );
}

export default PostPage;