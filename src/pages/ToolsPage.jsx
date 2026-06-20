import React, { useEffect, useState } from 'react';
import { fetchAffiliates } from '../api';
import SEO from '../components/SEO';

function ToolsPage() {
  const [affiliates, setAffiliates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetchAffiliates()
      .then((data) => setAffiliates(Array.isArray(data) ? data : []))
      .catch(() => setAffiliates([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    'All',
    ...new Set(affiliates.map((a) => a.category).filter(Boolean)),
  ];
  const filtered =
    activeCategory === 'All'
      ? affiliates
      : affiliates.filter((a) => a.category === activeCategory);

  // inside return:
  <SEO
    title='Recommended Tools'
    description='Handpicked digital products and services we personally recommend — with exclusive deals and affiliate discounts.'
    keywords='recommended tools, digital products, affiliate deals, saas tools'
    url='/tools'
  />;
  return (
    <div>
      {/* Hero */}
      <div className='page-hero'>
        <div className='page-hero-inner'>
          <h1>Recommended Tools</h1>
          <p>
            Handpicked digital products and services we personally recommend —
            with exclusive deals.
          </p>
        </div>
      </div>

      <div className='tools-page-wrap'>
        {/* Category Filter */}
        <div className='tools-filter'>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`tools-filter-btn ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <p className='loading'>Loading tools...</p>
        ) : filtered.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888', padding: 40 }}>
            No tools found.
          </p>
        ) : (
          <div className='tools-grid'>
            {filtered.map((a) => (
              <div key={a.id} className='tool-card'>
                <div className='tool-card-header'>
                  <div className='tool-logo'>
                    {a.logo ? (
                      <img src={a.logo} alt={a.name} />
                    ) : (
                      a.name.charAt(0)
                    )}
                  </div>
                  <div>
                    <h3 className='tool-name'>{a.name}</h3>
                    <span className='tool-category'>{a.category}</span>
                  </div>
                </div>
                <p className='tool-description'>
                  {a.description ||
                    'A top-rated digital tool for creators and businesses.'}
                </p>
                <div className='tool-card-footer'>
                  <span className='tool-commission'>
                    💰 {a.commission}% commission
                  </span>

                  <a
                    href={a.url}
                    target='_blank'
                    rel='noreferrer'
                    className='tool-cta'
                  >
                    Visit & Get Deal →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ToolsPage;
