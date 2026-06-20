import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

<SEO
  title='About Us'
  description='Learn about Softprofit Hub — your trusted guide to the best digital products on the internet.'
  keywords='about softprofit hub, digital products blog'
  url='/about'
/>;

function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <div className='page-hero'>
        <div className='page-hero-inner'>
          <h1>About Softprofit Hub</h1>
          <p>
            Your trusted guide to the best digital products on the internet.
          </p>
        </div>
      </div>

      <div className='about-wrap'>
        {/* Mission */}
        <div className='about-section'>
          <div className='about-text'>
            <h2>Our Mission</h2>
            <p>
              At Softprofit Hub, we believe that the right digital tools can
              transform your business, boost your productivity, and help you
              earn more. Our mission is simple — to help you find, compare, and
              choose the best digital products without wasting time or money.
            </p>
            <p>
              We test every tool we recommend. No paid placements. No fluff.
              Just honest, in-depth reviews from people who actually use these
              products.
            </p>
          </div>
          <div className='about-image'>
            <img
              src='https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80'
              alt='Our mission'
            />
          </div>
        </div>

        {/* What We Cover */}
        <div className='about-categories'>
          <h2>What We Cover</h2>
          <div className='about-cats-grid'>
            {[
              {
                icon: '🤖',
                title: 'AI Tools',
                desc: 'The best AI writing, design, and automation tools.',
              },
              {
                icon: '📚',
                title: 'E-Learning',
                desc: 'Top platforms to learn new skills and grow your career.',
              },
              {
                icon: '📣',
                title: 'Marketing',
                desc: 'Email, social, and SEO tools to grow your audience.',
              },
              {
                icon: '🎨',
                title: 'Design',
                desc: 'Visual tools for creators, brands, and freelancers.',
              },
              {
                icon: '⚙️',
                title: 'SaaS',
                desc: 'Software that helps businesses automate and scale.',
              },
              {
                icon: '✍️',
                title: 'Copywriting',
                desc: 'Tools to write faster, better, and convert more.',
              },
            ].map((cat) => (
              <div key={cat.title} className='about-cat-card'>
                <span className='about-cat-icon'>{cat.icon}</span>
                <h3>{cat.title}</h3>
                <p>{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <div className='about-disclosure'>
          <h2>Affiliate Disclosure</h2>
          <p>
            Softprofit Hub is reader-supported. Some links on this site are
            affiliate links, meaning we may earn a small commission if you
            purchase through them — at no extra cost to you. This helps us keep
            the site running and the content free. We only recommend products we
            genuinely believe in.
          </p>
        </div>

        {/* CTA */}
        <div className='about-cta'>
          <h2>Ready to Find Your Next Favourite Tool?</h2>
          <p>Browse our reviews and recommendations — updated regularly.</p>
          <div
            style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link to='/blog' className='about-cta-btn'>
              Read the Blog
            </Link>
            <Link to='/tools' className='about-cta-btn outline'>
              Browse Tools
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
