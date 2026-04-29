import { useParams, Link, Navigate } from 'react-router-dom';
import SEO, { breadcrumbSchema } from '../components/shared/SEO.jsx';
import Nav from '../components/shared/Nav.jsx';
import Footer from '../components/shared/Footer.jsx';
import Eyebrow from '../components/shared/Eyebrow.jsx';
import { useReveal } from '../components/shared/useReveal.js';
import { POSTS, formatDate } from '../data/blog.js';

/* ─── Content block renderer ─────────────────────────────────────────────── */
function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 className="serif" style={{ fontSize: 'clamp(22px, 2.8vw, 36px)', lineHeight: 1.15, letterSpacing: '-0.012em', marginTop: 'clamp(48px, 6vw, 72px)', marginBottom: 20 }}>
          {block.text}
        </h2>
      );
    case 'h3':
      return (
        <h3 className="serif" style={{ fontSize: 'clamp(18px, 2vw, 26px)', lineHeight: 1.2, letterSpacing: '-0.008em', marginTop: 36, marginBottom: 14 }}>
          {block.text}
        </h3>
      );
    case 'p':
      return (
        <p className="body" style={{ fontSize: 'clamp(16px, 1.6vw, 18px)', lineHeight: 1.8, color: 'var(--ink-2)', marginBottom: 22, maxWidth: '66ch' }}>
          {block.text}
        </p>
      );
    case 'ul':
      return (
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28, paddingLeft: 0 }}>
          {block.items.map((item, i) => (
            <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'baseline', maxWidth: '62ch' }}>
              <span style={{ color: 'var(--accent)', fontFamily: 'var(--mono)', fontSize: 12, flexShrink: 0 }}>→</span>
              <span className="body" style={{ fontSize: 'clamp(15px, 1.5vw, 17px)', lineHeight: 1.65, color: 'var(--ink-2)' }}>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28, counterReset: 'ol-counter', paddingLeft: 0 }}>
          {block.items.map((item, i) => (
            <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'baseline', maxWidth: '62ch' }}>
              <span className="mono" style={{ color: 'var(--accent)', fontSize: 11, flexShrink: 0, minWidth: 20 }}>{String(i + 1).padStart(2, '0')}</span>
              <span className="body" style={{ fontSize: 'clamp(15px, 1.5vw, 17px)', lineHeight: 1.65, color: 'var(--ink-2)' }}>{item}</span>
            </li>
          ))}
        </ol>
      );
    case 'quote':
      return (
        <blockquote style={{ borderLeft: '3px solid var(--accent)', paddingLeft: 'clamp(20px, 3vw, 36px)', margin: 'clamp(32px, 5vw, 56px) 0' }}>
          <p className="serif italic" style={{ fontSize: 'clamp(18px, 2.4vw, 28px)', lineHeight: 1.3, letterSpacing: '-0.01em', color: 'var(--ink)', maxWidth: '48ch' }}>
            {block.text}
          </p>
          {block.attr && (
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 16 }}>
              — {block.attr}
            </div>
          )}
        </blockquote>
      );
    case 'divider':
      return <div style={{ borderTop: '1px solid var(--line-strong)', margin: 'clamp(32px, 5vw, 56px) 0' }} />;
    case 'callout': {
      // Parse "text → /route" format
      const parts = block.text.split('→');
      const calloutText = parts[0].trim();
      const calloutLink = parts[1] ? parts[1].trim() : null;
      return (
        <div style={{ background: 'var(--bg-elev)', border: '1px solid var(--line-strong)', borderLeft: '3px solid var(--accent)', borderRadius: 4, padding: 'clamp(20px, 3vw, 32px)', margin: 'clamp(32px, 5vw, 56px) 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <p className="body" style={{ fontSize: 15, maxWidth: '52ch', margin: 0 }}>{calloutText}</p>
          {calloutLink && (
            <Link to={calloutLink} className="btn btn-accent" style={{ fontSize: 14, padding: '12px 20px', flexShrink: 0 }}>
              Learn more <span className="arr">→</span>
            </Link>
          )}
        </div>
      );
    }
    default:
      return null;
  }
}

/* ─── Related posts ──────────────────────────────────────────────────────── */
function RelatedPosts({ current }) {
  const related = POSTS
    .filter(p => p.slug !== current.slug && p.category === current.category)
    .slice(0, 2);

  const others = related.length < 2
    ? POSTS.filter(p => p.slug !== current.slug && !related.includes(p)).slice(0, 2 - related.length)
    : [];

  const toShow = [...related, ...others];
  if (toShow.length === 0) return null;

  return (
    <section className="section-pad-sm" style={{ borderTop: '1px solid var(--line-strong)', background: 'var(--bg-elev)' }}>
      <div className="container">
        <Eyebrow>More from the blog</Eyebrow>
        <div className="grid-2" style={{ gap: 'var(--gap)', marginTop: 32 }}>
          {toShow.map(post => (
            <Link key={post.slug} to={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <article style={{ padding: 'clamp(20px, 2.5vw, 30px)', border: '1px solid var(--line-strong)', borderRadius: 4, background: 'var(--bg)', height: '100%' }} className="lift">
                <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
                  <span className="mono" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent)' }}>{post.category}</span>
                  <span className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{post.readTime}</span>
                </div>
                <h3 className="serif" style={{ fontSize: 'clamp(16px, 1.8vw, 22px)', lineHeight: 1.2, marginBottom: 10 }}>{post.title}</h3>
                <p className="body" style={{ fontSize: 14, color: 'var(--ink-3)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</p>
                <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', marginTop: 16, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Read →</div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */
export default function BlogPost() {
  useReveal();
  const { slug } = useParams();
  const post = POSTS.find(p => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const postIdx = POSTS.indexOf(post);
  const prev = POSTS[postIdx + 1]; // older
  const next = POSTS[postIdx - 1]; // newer

  const schema = breadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: post.title, href: `/blog/${post.slug}` },
  ]);

  return (
    <div className="page">
      <SEO
        title={post.title}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
        keywords={post.tags.join(', ')}
        type="article"
        schema={schema}
      />
      <Nav />

      {/* Hero */}
      <section style={{ paddingTop: 64, paddingBottom: 'clamp(40px, 6vw, 70px)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
            <Eyebrow>{post.category}</Eyebrow>
            <Link to="/blog" className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none' }}>
              ← All articles
            </Link>
          </div>

          <div className="grid" style={{ gap: 'var(--gap)', alignItems: 'end' }}>
            <h1 className="col-8 serif" style={{ fontSize: 'clamp(26px, 4vw, 60px)', lineHeight: 1.08, letterSpacing: '-0.018em', maxWidth: '22ch' }}>
              {post.title}
            </h1>
            <div className="col-4">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Published</div>
                  <div className="body" style={{ marginTop: 4, fontSize: 15 }}>{formatDate(post.date)}</div>
                </div>
                <div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Read time</div>
                  <div className="body" style={{ marginTop: 4, fontSize: 15 }}>{post.readTime}</div>
                </div>
                <div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>Tags</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {post.tags.map(t => (
                      <span key={t} className="mono" style={{ fontSize: 10, padding: '3px 8px', border: '1px solid var(--line-strong)', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-3)' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Excerpt */}
          <p className="body-lg" style={{ marginTop: 32, maxWidth: '58ch', color: 'var(--ink-3)', borderTop: '1px solid var(--line-strong)', paddingTop: 28 }}>
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* Article body */}
      <article style={{ borderTop: '1px solid var(--line-strong)', paddingBottom: 'clamp(60px, 8vw, 100px)' }}>
        <div className="container" style={{ paddingTop: 'clamp(40px, 6vw, 72px)' }}>
          <div style={{ maxWidth: '72ch' }}>
            {post.content.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </div>
      </article>

      {/* Prev / Next */}
      <section style={{ borderTop: '1px solid var(--line-strong)', padding: 'clamp(36px, 5vw, 56px) 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          {next ? (
            <Link to={`/blog/${next.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>← Newer</div>
              <div className="serif" style={{ fontSize: 'clamp(15px, 1.8vw, 20px)', maxWidth: '32ch' }}>{next.title}</div>
            </Link>
          ) : <div />}
          <Link to="/blog" className="btn btn-ghost">All articles</Link>
          {prev ? (
            <Link to={`/blog/${prev.slug}`} style={{ textDecoration: 'none', color: 'inherit', textAlign: 'right' }}>
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>Older →</div>
              <div className="serif" style={{ fontSize: 'clamp(15px, 1.8vw, 20px)', maxWidth: '32ch' }}>{prev.title}</div>
            </Link>
          ) : <div />}
        </div>
      </section>

      <RelatedPosts current={post} />

      {/* CTA */}
      <section style={{ background: 'var(--bg-deep)', color: 'var(--bg)', padding: 'clamp(60px, 8vw, 100px) 0', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'var(--accent)' }} />
        <div className="container">
          <Eyebrow light>Work with us</Eyebrow>
          <h2 className="display" style={{ color: 'var(--bg)', marginTop: 18, fontSize: 'clamp(40px, 6vw, 90px)', maxWidth: '18ch', lineHeight: 1.04 }}>
            Got something <span className="italic" style={{ color: 'var(--accent)' }}>worth building?</span>
          </h2>
          <div style={{ display: 'flex', gap: 16, marginTop: 32, flexWrap: 'wrap', alignItems: 'center' }}>
            <Link to="/contact" className="btn" style={{ background: 'var(--accent)', color: 'white', fontSize: 16, padding: '18px 28px' }}>
              Brief us <span className="arr">→</span>
            </Link>
            <a href="mailto:hello@crestify.co" className="mono" style={{ color: '#9c9b95', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              hello@crestify.co
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
