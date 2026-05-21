import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectByToken, getClientTasks } from '../../lib/kanbanDB.js';
import { FB_READY } from '../../lib/firebase.js';

const C = { bg: '#f3f7f5', card: '#ffffff', border: '#d4e6dc', text: '#0d1f16', muted: '#7a9e8a', accent: '#0d9b6a', green: '#0d9b6a' };

const COLUMNS = [
  { id: 'todo',       label: 'To Do',      dot: '#5a5870' },
  { id: 'inprogress', label: 'In Progress', dot: '#f59e0b' },
  { id: 'review',     label: 'Review',      dot: '#6c47ff' },
  { id: 'done',       label: 'Done',        dot: '#0d9b6a' },
];

const PRIORITY = {
  low:    { label: 'Low',  color: '#5a5870' },
  medium: { label: 'Med',  color: '#f59e0b' },
  high:   { label: 'High', color: '#ef4444' },
};

function Badge({ children, color = '#5a5870' }) {
  return <span style={{ fontFamily: 'var(--mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', padding: '2px 7px', borderRadius: 999, background: color + '22', color, border: `1px solid ${color}44` }}>{children}</span>;
}

function fmtDate(ts) {
  if (!ts) return null;
  const d = ts?.toDate ? ts.toDate() : new Date(ts);
  const now = new Date();
  const diff = now - d;
  if (diff < 60_000) return 'Just now';
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (d.toDateString() === now.toDateString())
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  if (d.getFullYear() === now.getFullYear())
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
      ' · ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function TaskCard({ task }) {
  const p = PRIORITY[task.priority] || PRIORITY.medium;
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 16px', marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: p.color }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#0d9b6a12', border: '1px solid #0d9b6a28', borderRadius: 999, padding: '2px 8px' }}>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#0d9b6a' }} />
          <span style={{ fontFamily: 'var(--mono)', fontSize: 8, color: '#0d9b6a', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Kaart · Crestify</span>
        </div>
      </div>
      <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: C.text, lineHeight: 1.45, marginBottom: task.description ? 8 : 0 }}>{task.title}</p>
      {task.description && (
        <p style={{ fontFamily: 'var(--sans)', fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{task.description}</p>
      )}
      <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
        <Badge color={p.color}>{p.label}</Badge>
        {task.assignee && <Badge color="#6c47ff">{task.assignee}</Badge>}
      </div>
      {task.createdAt && (
        <div style={{ marginTop: 8, fontFamily: 'var(--mono)', fontSize: 9, color: C.muted, letterSpacing: '0.08em' }}>
          Added {fmtDate(task.createdAt)}
        </div>
      )}
    </div>
  );
}

export default function PMClientView() {
  const { token } = useParams();
  const [project, setProject] = useState(null);
  const [tasks,   setTasks]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(false);

  useEffect(() => {
    if (!FB_READY) { setError(true); setLoading(false); return; }
    async function load() {
      try {
        const p = await getProjectByToken(token);
        if (!p) { setError(true); setLoading(false); return; }
        const t = await getClientTasks(p.id);
        setProject(p); setTasks(t);
      } catch { setError(true); }
      finally  { setLoading(false); }
    }
    load();
  }, [token]);

  if (loading) return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.16em' }}>Loading…</span>
    </div>
  );

  if (error || !project) return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24 }}>
      <div style={{ fontFamily: 'var(--serif)', fontSize: 40, color: C.text }}>Link not found.</div>
      <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: C.muted, maxWidth: '36ch', textAlign: 'center' }}>
        This project link may be expired or invalid. Contact the Crestify team for a fresh link.
      </p>
      <a href="mailto:contact@crestify.co" style={{ fontFamily: 'var(--mono)', fontSize: 11, color: C.accent, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
        contact@crestify.co
      </a>
    </div>
  );

  const doneTasks  = tasks.filter(t => t.column === 'done').length;
  const progress   = tasks.length > 0 ? Math.round((doneTasks / tasks.length) * 100) : 0;

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text }}>
      {/* Header */}
      <header style={{ borderBottom: `1px solid ${C.border}`, padding: '0 clamp(20px, 4vw, 40px)', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: C.bg, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: C.green }} />
          <span style={{ fontFamily: 'var(--serif)', fontSize: 18, color: C.text, letterSpacing: '-0.02em' }}>Kaart Studio</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: C.muted }}>· Crestify · Project tracker</span>
        </div>
        <a href="mailto:contact@crestify.co" style={{ fontFamily: 'var(--mono)', fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none' }}>
          Contact us
        </a>
      </header>

      {/* Project hero */}
      <div style={{ padding: 'clamp(32px, 5vw, 56px) clamp(20px, 4vw, 40px)', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 12 }}>
          {project.client || 'Your project'}
        </div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 5vw, 52px)', color: C.text, lineHeight: 1.05, marginBottom: 24 }}>
          {project.name}
        </h1>
        {/* Progress bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ flex: 1, maxWidth: 280, height: 5, background: '#d4e6dc', borderRadius: 99 }}>
            <div style={{ width: `${progress}%`, height: '100%', background: project.color || C.green, borderRadius: 99, transition: 'width 0.6s ease' }} />
          </div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: C.muted }}>
            {doneTasks} of {tasks.length} tasks done · {progress}%
          </span>
        </div>
      </div>

      {/* Kanban columns */}
      <div style={{ overflowX: 'auto', padding: 'clamp(20px, 3vw, 36px) clamp(20px, 4vw, 40px)' }}>
        {tasks.length === 0 ? (
          <div style={{ padding: '60px 0', textAlign: 'center', color: C.muted, fontFamily: 'var(--mono)', fontSize: 12 }}>
            No tasks shared yet — check back soon.
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 16, minWidth: 'max-content' }}>
            {COLUMNS.map(col => {
              const colTasks = tasks.filter(t => t.column === col.id);
              if (colTasks.length === 0) return null;
              return (
                <div key={col.id} style={{ flex: '0 0 260px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: col.dot }} />
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.16em', color: C.muted }}>{col.label}</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: C.muted, background: '#d4e6dc', padding: '1px 6px', borderRadius: 999 }}>{colTasks.length}</span>
                  </div>
                  {colTasks.map(t => <TaskCard key={t.id} task={t} />)}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: '20px clamp(20px, 4vw, 40px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: C.muted }}>
          Powered by <a href="https://crestify.co" style={{ color: C.accent, textDecoration: 'none' }}>Crestify</a>
        </span>
        <a href="mailto:contact@crestify.co" style={{ fontFamily: 'var(--mono)', fontSize: 10, color: C.muted, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          contact@crestify.co
        </a>
      </footer>
    </div>
  );
}
