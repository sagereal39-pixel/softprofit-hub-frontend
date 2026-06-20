import React, { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import Sidebar from '../components/Sidebar';
import { fetchPosts } from '../api';
import SEO from '../components/SEO';

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadPosts(currentPage);
  }, [currentPage]);

  const loadPosts = async (page) => {
    setLoading(true);
    try {
      const data = await fetchPosts(page);
      if (data.posts) {
        setPosts(data.posts);
        setTotalPages(data.pages || 1);
      }
    } catch {
      setPosts([]);
    }
    setLoading(false);
  };

  const allTags = [...new Set(posts.map((p) => p.category).filter(Boolean))];

  const filtered = posts.filter((p) => {
    const matchSearch =
      !search ||
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase());
    const matchTag = !activeTag || p.category === activeTag;
    return matchSearch && matchTag;
  });

  // inside return:
  <SEO
    title='Blog'
    description='In-depth reviews, comparisons and guides on the best digital products and tools.'
    keywords='blog, digital products, software reviews, ai tools'
    url='/blog'
  />;

  return (
    <div>
      {/* Hero */}
      <div className='page-hero'>
        <div className='page-hero-inner'>
          <h1>The Blog</h1>
          <p>
            In-depth reviews, comparisons and guides on the best digital
            products and tools.
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className='search-bar-wrap'>
        <div className='search-bar-inner'>
          <input
            type='text'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setActiveTag('');
            }}
            placeholder='🔍  Search posts...'
            className='search-bar-input'
          />
          {search && (
            <button onClick={() => setSearch('')} className='search-clear'>
              ✕
            </button>
          )}
        </div>
        {allTags.length > 0 && (
          <div className='tag-filter-row'>
            <span className='tag-filter-label'>Filter by:</span>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() =>
                  setActiveTag((prev) => (prev === tag ? '' : tag))
                }
                className={`tag-filter-pill ${activeTag === tag ? 'active' : ''}`}
              >
                {tag}
              </button>
            ))}
            {activeTag && (
              <button
                onClick={() => setActiveTag('')}
                className='tag-filter-clear'
              >
                ✕ Clear
              </button>
            )}
          </div>
        )}
        {(search || activeTag) && (
          <p className='search-results-count'>
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            {activeTag ? (
              <>
                {' '}
                in <strong>{activeTag}</strong>
              </>
            ) : (
              ''
            )}
            {search ? (
              <>
                {' '}
                for "<strong>{search}</strong>"
              </>
            ) : (
              ''
            )}
          </p>
        )}
      </div>

      <div className='page-layout'>
        <main>
          {loading ? (
            <p className='loading'>Loading posts...</p>
          ) : filtered.length === 0 ? (
            <div className='no-results'>
              <p>😕 No posts found.</p>
              <button
                onClick={() => {
                  setSearch('');
                  setActiveTag('');
                }}
                className='read-more'
                style={{ marginTop: 12 }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filtered.map((post) => <BlogCard key={post.id} post={post} />)
          )}
          {!search && !activeTag && totalPages > 1 && (
            <div className='pagination'>
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={currentPage === page ? 'active' : ''}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next &gt;&gt;
              </button>
            </div>
          )}
        </main>
        <Sidebar
          onTagClick={(tag) =>
            setActiveTag((prev) => (prev === tag ? '' : tag))
          }
          activeTag={activeTag}
        />
      </div>
    </div>
  );
}

export default BlogPage;
