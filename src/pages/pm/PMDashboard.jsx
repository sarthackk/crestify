import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase.js';
import { usePMAuth } from './PMAuth.jsx';
import { subscribeProjects, createProject, updateProject, deleteProject } from '../../lib/kanbanDB.js';

/* ─── Colours ─────────────────────────────────────────────────────────────── */
const C = { bg: '#f3f7f5', card: '#ffffff', border: '#d4e6dc', text: '#0d1f16', muted: '#7a9e8a', accent: '#0d9b6a', green: '#0d9b6a', purple: '#6c47ff' };

const PROJECT_COLORS = ['#0d9b6a','#6c47ff','#0d9b6a','#0891b2','#f59e0b','#e879f9','#3b82f6','#ef4444'];

const STATUS_STYLES = {
  active:  { bg: '#0d9b6a18', color: '#0d9b6a', label: 'Active' },
  paused:  { bg: '#f59e0b18', color: '#b45309', label: 'Paused' },
  done:    { bg: '#22c55e18', color: '#15803d', label: 'Done' },
};

/* ─── New Project Modal ───────────────────────────────────────────────────── */
function NewProjectModal({ onClose }) {
  const [name,   setName]   = useState('');
  const [client, setClient] = useState('');
  const [color,  setColor]  = useState('#0d9b6a');
  const [saving, setSaving] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    try {
      const id = await createProject({ name: name.trim(), client: client.trim(), color });
      window.location.href = `/pm/board/${id}`;
    } catch { setSaving(false); }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 'clamp(24px, 4vw, 40px)', width: '100%', maxWidth: 480 }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 28, color: C.text, marginBottom: 28 }}>New project</h2>
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Field label="Project name" value={name} onChange={setName} placeholder="e.g. Wardrobe Shopify Redesign" required />
          <Field label="Client name" value={client} onChange={setClient} placeholder="e.g. Wardrobe Co." />
          <div>
            <Label>Accent colour</Label>
            <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
              {PROJECT_COLORS.map(c => (
                <button key={c} type="button" onClick={() => setColor(c)}
                  style={{ width: 28, height: 28, borderRadius: '50%', background: c, border: color === c ? '3px solid #fff' : '3px solid transparent', cursor: 'pointer', boxSizing: 'border-box', flexShrink: 0 }} />
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button type="button" onClick={onClose}
              style={{ flex: 1, background: 'transparent', border: `1px solid ${C.border}`, borderRadius: 8, padding: '12px', color: C.muted, fontFamily: 'var(--sans)', fontSize: 14, cursor: 'pointer' }}>
              Cancel
            </button>
            <button type="submit" disabled={saving || !name.trim()}
              style={{ flex: 2, background: C.accent, border: 'none', borderRadius: 8, padding: '12px', color: '#fff', fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500, cursor: 'pointer', opacity: saving ? 0.6 : 1 }}>
              {saving ? 'Creating…' : 'Create project →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, required }) {
  return (
    <div>
      <Label>{label}</Label>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} required={required}
        style={{ width: '100%', background: '#f3f7f5', border: `1px solid ${C.border}`, borderRadius: 8, padding: '12px 14px', color: C.text, fontFamily: 'var(--sans)', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
        onFocus={e => e.target.style.borderColor = C.accent}
        onBlur={e  => e.target.style.borderColor = C.border} />
    </div>
  );
}
function Label({ children }) {
  return <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 6 }}>{children}</div>;
}

/* ─── Project Card ────────────────────────────────────────────────────────── */
function ProjectCard({ p, onDelete }) {
  const st = STATUS_STYLES[p.status] || STATUS_STYLES.active;
  const [menuOpen, setMenuOpen] = useState(false);

  async function archive() {
    await updateProject(p.id, { status: p.status === 'done' ? 'active' : 'done' });
    setMenuOpen(false);
  }
  async function del() {
    if (!confirm(`Delete "${p.name}"? This removes all tasks too.`)) return;
    await deleteProject(p.id);
    setMenuOpen(false);
  }

  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', position: 'relative', cursor: 'pointer' }}
      onClick={() => window.location.href = `/pm/board/${p.id}`}>
      {/* colour strip */}
      <div style={{ height: 4, background: p.color || C.accent }} />
      <div style={{ padding: '20px 22px 22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 6 }}>
              {p.client || 'Internal'}
            </div>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: 20, color: C.text, lineHeight: 1.2, marginBottom: 12 }}>{p.name}</h3>
          </div>
          {/* kebab menu */}
          <div style={{ position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setMenuOpen(o => !o)}
              style={{ background: 'none', border: 'none', color: C.muted, fontSize: 18, cursor: 'pointer', padding: '0 4px', lineHeight: 1 }}>⋮</button>
            {menuOpen && (
              <div style={{ position: 'absolute', top: 24, right: 0, background: '#ffffff', border: `1px solid ${C.border}`, borderRadius: 8, minWidth: 140, zIndex: 10, overflow: 'hidden' }}>
                <MenuItem onClick={archive}>{p.status === 'done' ? '↺ Reactivate' : '✓ Mark done'}</MenuItem>
                <MenuItem onClick={del} danger>✕ Delete</MenuItem>
              </div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', padding: '3px 8px', borderRadius: 999, background: st.bg, color: st.color }}>
            {st.label}
          </span>
          {p.assignees?.length > 0 && (
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: C.muted }}>
              {p.assignees.length} member{p.assignees.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function MenuItem({ children, onClick, danger }) {
  return (
    <button onClick={onClick}
      style={{ display: 'block', width: '100%', background: 'none', border: 'none', padding: '10px 14px', textAlign: 'left', fontFamily: 'var(--mono)', fontSize: 11, color: danger ? '#ef4444' : C.muted, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}
      onMouseEnter={e => e.target.style.background = '#eef4f1'}
      onMouseLeave={e => e.target.style.background = 'none'}>
      {children}
    </button>
  );
}

/* ─── Main ────────────────────────────────────────────────────────────────── */
export default function PMDashboard() {
  const { user, profile } = usePMAuth();
  const [projects, setProjects] = useState([]);
  const [modal,    setModal]    = useState(false);
  const [filter,   setFilter]   = useState('active'); // 'all' | 'active' | 'done'

  useEffect(() => {
    const unsub = subscribeProjects(setProjects);
    return unsub;
  }, []);

  const shown = projects.filter(p =>
    filter === 'all'    ? true :
    filter === 'active' ? p.status !== 'done' :
    p.status === 'done'
  );

  const isAdmin = profile?.role === 'admin';

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text }}>
      {/* ── Header ── */}
      <header style={{ borderBottom: `1px solid ${C.border}`, padding: '0 clamp(20px, 4vw, 48px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60, position: 'sticky', top: 0, background: C.bg, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: C.green }} />
          <span style={{ fontFamily: 'var(--serif)', fontSize: 18, color: C.text, letterSpacing: '-0.02em' }}>Kaart Studio</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: C.muted }}>· Crestify PM</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: C.green, textTransform: 'uppercase', letterSpacing: '0.14em', background: '#0d9b6a18', border: '1px solid #0d9b6a33', padding: '3px 10px', borderRadius: 999 }}>
            {profile?.role || 'dev'}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: C.muted }}>{profile?.name || user?.email}</span>
          <button onClick={() => signOut(auth).then(() => window.location.replace('/pm/login'))}
            style={{ background: 'none', border: `1px solid ${C.border}`, borderRadius: 6, padding: '6px 14px', color: C.muted, fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', cursor: 'pointer' }}>
            Sign out
          </button>
        </div>
      </header>

      {/* ── Body ── */}
      <main style={{ padding: 'clamp(28px, 4vw, 48px) clamp(20px, 4vw, 48px)' }}>
        {/* Title row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: C.text, lineHeight: 1.05, marginBottom: 6 }}>
              Projects
            </h1>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: C.muted }}>
              {projects.filter(p => p.status !== 'done').length} active · {projects.filter(p => p.status === 'done').length} done
            </p>
          </div>
          {isAdmin && (
            <button onClick={() => setModal(true)}
              style={{ background: C.accent, border: 'none', borderRadius: 8, padding: '11px 22px', color: '#fff', fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
              + New project
            </button>
          )}
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 28 }}>
          {['active', 'all', 'done'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ background: filter === f ? '#d4e6dc' : 'none', border: filter === f ? `1px solid ${C.border}` : '1px solid transparent', borderRadius: 6, padding: '6px 14px', color: filter === f ? C.text : C.muted, fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'capitalize', letterSpacing: '0.1em', cursor: 'pointer' }}>
              {f}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        {shown.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: C.muted, fontFamily: 'var(--mono)', fontSize: 12 }}>
            {filter === 'done' ? 'No completed projects yet.' : 'No projects yet. Create the first one →'}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {shown.map(p => <ProjectCard key={p.id} p={p} />)}
          </div>
        )}
      </main>

      {modal && <NewProjectModal onClose={() => setModal(false)} />}
    </div>
  );
}
