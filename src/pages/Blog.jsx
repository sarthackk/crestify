import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO, { breadcrumbSchema } from '../components/shared/SEO.jsx';
import Nav from '../components/shared/Nav.jsx';
import Footer from '../components/shared/Footer.jsx';
import Eyebrow from '../components/shared/Eyebrow.jsx';
import { useReveal } from '../components/shared/useReveal.js';
import { POSTS, CATEGORIES, formatDate } from '../data/blog.js';

function BlogCard({ post, featured = false }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
      className={featured ? 'col-12' : 'col-6'}
    >
      <article
        className="lift"
        style={{
          padding: featured ? 'clamp(32px, 5vw, 60px)' : 'clamp(24px, 3vw, 36px)',
          border: '1px solid var(--line-strong)',
          borderRadius: 4,
          background: 'var(--bg)',
          height: '100%',
          display: 'flex',
          flexDirection: featured ? 'row' : 'column',
          gap: featured ? 'var(--gap)' : 24,
          alignItems: featured ? 'center' : 'flex-start',
        }}
      >
        {/* Left / full column */}
        <div style={{ flex: featured ? '0 0 38%' : '1 1 100%' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginBottom: 18 }}>
            <span
              className="mono"
              style={{
                fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em',
                color: 'var(--accent)', background: 'var(--bg-elev)',
                padding: '4px 10px', borderRadius: 999,
              }}
            >{post.category}</span>
            <span className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{post.readTime} read</span>
          </div>
          <h2
            className="serif"
            style={{
              fontSize: featured ? 'clamp(24px, 3vw, 40px)' : 'clamp(18px, 2vw, 26px)',
              lineHeight: 1.15, letterSpacing: '-0.012em',
              maxWidth: featured ? '22ch' : '28ch',
            }}
          >{post.title}</h2>
        </div>

        {/* Right / bottom column */}
        <div style={{ flex: 1 }}>
          <p
            className="body"
            style={{
              fontSize: 15, color: 'var(--ink-3)', lineHeight: 1.65,
              maxWidth: '52ch',
              display: '-webkit-box', WebkitLineClamp: featured ? 4 : 3,
              WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}
          >{post.excerpt}</p>
          <div
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--line-strong)',
            }}
          >
            <span className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              {formatDate(post.date)}
            </span>
            <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              Read →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function Blog() {
  useReveal();
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? POSTS
    : POSTS.filter(p => p.category === activeCategory);

  const schema = breadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
  ]);

  return (
    <div className="page">
      <SEO
        title="Blog — Insights on SaaS, Shopify & Product Development"
        description="Practical writing on SaaS development, Shopify, D2C ecommerce, AI products, and MVP development — from the founders who build them."
        canonical="/blog"
        keywords="SaaS development blog, Shopify development India, D2C ecommerce insights, MVP development tips, product development India"
        schema={schema}
      />
      <Nav />

      {/* Hero */}
      <section style={{ paddingTop: 64, paddingBottom: 'clamp(40px, 6vw, 70px)' }}>
        <div className="container">
          <div style={{ marginBottom: 40 }}><Eyebrow index="01">Writing · Crestify</Eyebrow></div>
          <div className="grid" style={{ gap: 'var(--gap)', alignItems: 'end' }}>
            <div className="col-7">
              <h1 className="display" style={{ maxWidth: '16ch' }}>
                From the <span className="italic" style={{ color: 'var(--ink-3)' }}>build floor.</span>
              </h1>
              <p className="body-lg" style={{ marginTop: 24, maxWidth: '52ch' }}>
                Practical writing on SaaS, Shopify, D2C ecommerce, AI products, and MVP development. No hot takes — just what we have learned from shipping real products.
              </p>
            </div>
            <div className="col-5" style={{ textAlign: 'right' }}>
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Total articles</div>
              <div className="serif" style={{ fontSize: 'clamp(44px, 8vw, 64px)', lineHeight: 1, marginTop: 6 }}>{POSTS.length}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <div style={{ borderTop: '1px solid var(--line-strong)', borderBottom: '1px solid var(--line-strong)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: 'clamp(14px, 2vw, 20px) 0' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="mono"
                style={{
                  padding: '8px 14px',
                  border: '1px solid ' + (activeCategory === cat ? 'var(--ink)' : 'var(--line-strong)'),
                  background: activeCategory === cat ? 'var(--ink)' : 'transparent',
                  color: activeCategory === cat ? 'var(--bg)' : 'var(--ink-2)',
                  borderRadius: 999, fontSize: 11, textTransform: 'uppercase',
                  letterSpacing: '0.12em', cursor: 'pointer', transition: 'all 0.2s',
                }}
              >{cat}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Post grid */}
      <section className="section-pad">
        <div className="container">
          {filtered.length === 0 ? (
            <p className="body" style={{ color: 'var(--ink-3)' }}>No posts in this category yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 3vw, 32px)' }}>
              {/* Featured first post */}
              {activeCategory === 'All' && filtered[0] && (
                <BlogCard post={filtered[0]} featured />
              )}
              {/* Remaining grid */}
              <div className="grid" style={{ gap: 'clamp(20px, 3vw, 32px)', rowGap: 'clamp(20px, 3vw, 32px)' }}>
                {(activeCategory === 'All' ? filtered.slice(1) : filtered).map(post => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ background: 'var(--bg-elev)', borderTop: '1px solid var(--line-strong)', padding: 'clamp(60px, 8vw, 100px) 0' }}>
        <div className="container">
          <div className="grid" style={{ gap: 'var(--gap)', alignItems: 'center' }}>
            <div className="col-8">
              <Eyebrow>Start a project</Eyebrow>
              <h2 className="h2" style={{ marginTop: 16 }}>
                Read enough. <span className="italic" style={{ color: 'var(--ink-3)' }}>Let us build.</span>
              </h2>
              <p className="body-lg" style={{ marginTop: 16, maxWidth: '48ch' }}>
                Tell us what you are building. We reply within 48 hours.
              </p>
            </div>
            <div className="col-4" style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
              <Link to="/contact" className="btn btn-accent" style={{ fontSize: 16, padding: '18px 28px' }}>
                Brief us <span className="arr">→</span>
              </Link>
              <a href="mailto:hello@crestify.co" className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                hello@crestify.co
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
