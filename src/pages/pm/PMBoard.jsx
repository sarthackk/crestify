import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase.js';
import { usePMAuth } from './PMAuth.jsx';
import {
  subscribeTasks, createTask, updateTask, deleteTask,
  updateProject,
} from '../../lib/kanbanDB.js';

/* ─── Design tokens ───────────────────────────────────────────────────────── */
const C = { bg: '#f3f7f5', col: '#eef4f1', card: '#ffffff', border: '#d4e6dc', text: '#0d1f16', muted: '#7a9e8a', accent: '#0d9b6a', green: '#0d9b6a' };

const COLUMNS = [
  { id: 'todo',       label: 'To Do',       dot: '#5a5870' },
  { id: 'inprogress', label: 'In Progress',  dot: '#f59e0b' },
  { id: 'review',     label: 'Review',       dot: '#6c47ff' },
  { id: 'done',       label: 'Done',         dot: '#0d9b6a' },
];

const PRIORITY = {
  low:    { label: 'Low',    color: '#5a5870' },
  medium: { label: 'Med',    color: '#f59e0b' },
  high:   { label: 'High',   color: '#ef4444' },
};

/* ─── Small helpers ───────────────────────────────────────────────────────── */
function initials(name = '') {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';
}
function Avatar({ name, color = '#6c47ff', size = 26 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: color + '33', border: `1.5px solid ${color}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)', fontSize: size * 0.36, color, flexShrink: 0 }}>
      {initials(name)}
    </div>
  );
}
function Badge({ children, color = '#5a5870' }) {
  return <span style={{ fontFamily: 'var(--mono)', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.12em', padding: '2px 7px', borderRadius: 999, background: color + '22', color, border: `1px solid ${color}44` }}>{children}</span>;
}

function fmtDate(ts) {
  if (!ts) return null;
  const d = ts?.toDate ? ts.toDate() : new Date(ts);
  const now = new Date();
  const diff = now - d;
  // Under 1 min
  if (diff < 60_000) return 'Just now';
  // Under 1 hour
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  // Same day
  if (d.toDateString() === now.toDateString()) {
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  }
  // This year
  if (d.getFullYear() === now.getFullYear()) {
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
      ' · ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  }
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
function MonoLabel({ children }) {
  return <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 8 }}>{children}</div>;
}
function Input({ value, onChange, placeholder, type = 'text', style = {} }) {
  return (
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{ width: '100%', background: '#f3f7f5', border: `1px solid ${C.border}`, borderRadius: 7, padding: '10px 12px', color: C.text, fontFamily: 'var(--sans)', fontSize: 14, outline: 'none', boxSizing: 'border-box', ...style }}
      onFocus={e => e.target.style.borderColor = C.accent}
      onBlur={e  => e.target.style.borderColor = C.border} />
  );
}
function Textarea({ value, onChange, placeholder, rows = 4 }) {
  return (
    <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
      style={{ width: '100%', background: '#f3f7f5', border: `1px solid ${C.border}`, borderRadius: 7, padding: '10px 12px', color: C.text, fontFamily: 'var(--sans)', fontSize: 14, outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
      onFocus={e => e.target.style.borderColor = C.accent}
      onBlur={e  => e.target.style.borderColor = C.border} />
  );
}

/* ─── Task Detail / Edit Drawer ───────────────────────────────────────────── */
function TaskDrawer({ task, defaultColumn = 'todo', projectId, onClose, isAdmin }) {
  const [title,   setTitle]   = useState(task?.title || '');
  const [desc,    setDesc]    = useState(task?.description || '');
  const [col,     setCol]     = useState(task?.column || defaultColumn);
  const [prio,    setPrio]    = useState(task?.priority || 'medium');
  const [assign,  setAssign]  = useState(task?.assignee || '');
  const [visible, setVisible] = useState(task?.clientVisible ?? true);
  const [saving,  setSaving]  = useState(false);
  const isNew = !task;

  async function save() {
    if (!title.trim()) return;
    setSaving(true);
    const data = { title: title.trim(), description: desc, column: col, priority: prio, assignee: assign, clientVisible: visible };
    if (isNew) await createTask({ projectId, ...data });
    else       await updateTask(task.id, data);
    setSaving(false);
    onClose();
  }

  async function del() {
    if (!confirm('Delete this task?')) return;
    await deleteTask(task.id);
    onClose();
  }

  return (
    <>
      {/* Overlay */}
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 100 }} onClick={onClose} />
      {/* Panel */}
      <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(480px, 100vw)', background: '#ffffff', borderLeft: `1px solid ${C.border}`, zIndex: 101, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '18px 24px', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.14em' }}>
            {isNew ? 'New task' : 'Edit task'}
          </span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: C.muted, fontSize: 20, cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>

        {/* Fields */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 20, overflowY: 'auto', flex: 1 }}>
          <div>
            <MonoLabel>Task title</MonoLabel>
            <Input value={title} onChange={setTitle} placeholder="What needs to be done?" />
          </div>
          <div>
            <MonoLabel>Description</MonoLabel>
            <Textarea value={desc} onChange={setDesc} placeholder="More context, links, or details…" rows={4} />
          </div>
          <div>
            <MonoLabel>Column</MonoLabel>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {COLUMNS.map(c => (
                <button key={c.id} onClick={() => setCol(c.id)}
                  style={{ padding: '7px 14px', borderRadius: 6, border: col === c.id ? `1.5px solid ${c.dot}` : `1px solid ${C.border}`, background: col === c.id ? c.dot + '18' : 'transparent', color: col === c.id ? c.dot : C.muted, fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer' }}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <MonoLabel>Priority</MonoLabel>
            <div style={{ display: 'flex', gap: 6 }}>
              {Object.entries(PRIORITY).map(([key, { label, color }]) => (
                <button key={key} onClick={() => setPrio(key)}
                  style={{ padding: '7px 14px', borderRadius: 6, border: prio === key ? `1.5px solid ${color}` : `1px solid ${C.border}`, background: prio === key ? color + '18' : 'transparent', color: prio === key ? color : C.muted, fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer' }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <MonoLabel>Assignee name</MonoLabel>
            <Input value={assign} onChange={setAssign} placeholder="e.g. Sarthak" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button type="button" onClick={() => setVisible(v => !v)}
              style={{ width: 36, height: 20, borderRadius: 999, background: visible ? C.green : C.border, border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
              <span style={{ position: 'absolute', top: 2, left: visible ? 18 : 2, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
            </button>
            <div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: C.text }}>Visible to client</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: C.muted }}>Shows in the shareable client view</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: `1px solid ${C.border}`, display: 'flex', gap: 10, flexShrink: 0 }}>
          {!isNew && isAdmin && (
            <button onClick={del} style={{ background: 'none', border: `1px solid #ef444444`, borderRadius: 7, padding: '10px 16px', color: '#ef4444', fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer' }}>
              Delete
            </button>
          )}
          <button onClick={save} disabled={saving || !title.trim()}
            style={{ flex: 1, background: C.accent, border: 'none', borderRadius: 7, padding: '12px', color: '#fff', fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500, cursor: 'pointer', opacity: saving ? 0.6 : 1 }}>
            {saving ? 'Saving…' : isNew ? 'Add task →' : 'Save changes →'}
          </button>
        </div>
      </div>
    </>
  );
}

/* ─── Task Card ───────────────────────────────────────────────────────────── */
function TaskCard({ task, onOpen, onMoveLeft, onMoveRight, colIndex }) {
  const p = PRIORITY[task.priority] || PRIORITY.medium;
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: '12px 14px', cursor: 'pointer', marginBottom: 8 }}
      onClick={() => onOpen(task)}
      onMouseEnter={e => e.currentTarget.style.borderColor = C.accent}
      onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
      {/* top row: priority dot + studio tag */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: p.color }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: '#0d9b6a12', border: '1px solid #0d9b6a28', borderRadius: 999, padding: '2px 8px' }}>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#0d9b6a' }} />
          <span style={{ fontFamily: 'var(--mono)', fontSize: 8, color: '#0d9b6a', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Kaart · Crestify</span>
        </div>
      </div>
      <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: C.text, lineHeight: 1.45, marginBottom: 10 }}>{task.title}</p>
      {task.description && (
        <p style={{ fontFamily: 'var(--sans)', fontSize: 12, color: C.muted, lineHeight: 1.4, marginBottom: 10, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{task.description}</p>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {task.clientVisible && <Badge color="#0d9b6a">Client</Badge>}
          <Badge color={p.color}>{p.label}</Badge>
        </div>
        {task.assignee && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Avatar name={task.assignee} size={22} />
          </div>
        )}
      </div>
      {task.createdAt && (
        <div style={{ marginTop: 8, fontFamily: 'var(--mono)', fontSize: 9, color: C.muted, letterSpacing: '0.08em' }}>
          Added {fmtDate(task.createdAt)}
        </div>
      )}
      {/* move arrows */}
      <div style={{ display: 'flex', gap: 4, marginTop: 10, justifyContent: 'flex-end' }} onClick={e => e.stopPropagation()}>
        {colIndex > 0 && (
          <button onClick={() => onMoveLeft(task)} title="Move left"
            style={{ background: 'none', border: `1px solid ${C.border}`, borderRadius: 4, padding: '2px 7px', color: C.muted, fontSize: 11, cursor: 'pointer' }}>←</button>
        )}
        {colIndex < COLUMNS.length - 1 && (
          <button onClick={() => onMoveRight(task)} title="Move right"
            style={{ background: 'none', border: `1px solid ${C.border}`, borderRadius: 4, padding: '2px 7px', color: C.muted, fontSize: 11, cursor: 'pointer' }}>→</button>
        )}
      </div>
    </div>
  );
}

/* ─── Kanban Column ───────────────────────────────────────────────────────── */
function KanbanColumn({ col, tasks, colIndex, onOpen, onAdd, onMoveLeft, onMoveRight }) {
  return (
    <div style={{ flex: '0 0 280px', minWidth: 0 }}>
      {/* Column header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, padding: '0 2px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: col.dot }} />
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.16em', color: C.muted }}>{col.label}</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: C.muted, background: '#d4e6dc', padding: '1px 6px', borderRadius: 999 }}>{tasks.length}</span>
        </div>
        <button onClick={onAdd} title="Add task"
          style={{ background: 'none', border: `1px solid ${C.border}`, borderRadius: 5, padding: '2px 8px', color: C.muted, fontSize: 14, cursor: 'pointer', lineHeight: 1.2 }}>+</button>
      </div>
      {/* Tasks */}
      <div style={{ minHeight: 80 }}>
        {tasks.map(t => (
          <TaskCard key={t.id} task={t} onOpen={onOpen} colIndex={colIndex}
            onMoveLeft={onMoveLeft} onMoveRight={onMoveRight} />
        ))}
      </div>
    </div>
  );
}

/* ─── Share Modal ─────────────────────────────────────────────────────────── */
function ShareModal({ token, onClose }) {
  const url = `${window.location.origin}/share/${token}`;
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: '#ffffff', border: `1px solid ${C.border}`, borderRadius: 12, padding: 32, width: '100%', maxWidth: 460 }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 24, color: C.text, marginBottom: 8 }}>Client share link</h2>
        <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: C.muted, marginBottom: 20 }}>
          Share this with the client. They can see tasks marked "Visible to client" — read-only, no login needed.
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, background: '#f3f7f5', border: `1px solid ${C.border}`, borderRadius: 7, padding: '11px 14px', fontFamily: 'var(--mono)', fontSize: 11, color: C.muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {url}
          </div>
          <button onClick={copy} style={{ background: copied ? C.green : C.accent, border: 'none', borderRadius: 7, padding: '11px 18px', color: '#fff', fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', flexShrink: 0, transition: 'background 0.2s' }}>
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
        <button onClick={onClose} style={{ marginTop: 20, background: 'none', border: 'none', color: C.muted, fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', cursor: 'pointer' }}>Close</button>
      </div>
    </div>
  );
}

/* ─── Edit Project Modal ──────────────────────────────────────────────────── */
const PROJECT_COLORS = ['#0d9b6a','#6c47ff','#0d9b6a','#0891b2','#f59e0b','#e879f9','#3b82f6','#ef4444'];

function EditProjectModal({ project, onClose }) {
  const [name,   setName]   = useState(project.name);
  const [client, setClient] = useState(project.client || '');
  const [color,  setColor]  = useState(project.color || '#0d9b6a');
  const [status, setStatus] = useState(project.status || 'active');
  const [saving, setSaving] = useState(false);
  async function save(e) {
    e.preventDefault();
    setSaving(true);
    await updateProject(project.id, { name, client, color, status });
    setSaving(false);
    onClose();
  }
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: '#ffffff', border: `1px solid ${C.border}`, borderRadius: 12, padding: 32, width: '100%', maxWidth: 440 }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 24, color: C.text, marginBottom: 24 }}>Edit project</h2>
        <form onSubmit={save} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <MonoLabel>Project name</MonoLabel>
            <Input value={name} onChange={setName} placeholder="Project name" />
          </div>
          <div>
            <MonoLabel>Client name</MonoLabel>
            <Input value={client} onChange={setClient} placeholder="Client name" />
          </div>
          <div>
            <MonoLabel>Status</MonoLabel>
            <div style={{ display: 'flex', gap: 6 }}>
              {['active','paused','done'].map(s => (
                <button key={s} type="button" onClick={() => setStatus(s)}
                  style={{ flex: 1, padding: '8px', borderRadius: 6, border: status === s ? `1.5px solid ${C.accent}` : `1px solid ${C.border}`, background: status === s ? C.accent + '18' : 'transparent', color: status === s ? C.accent : C.muted, fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'capitalize', cursor: 'pointer' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <MonoLabel>Accent colour</MonoLabel>
            <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
              {PROJECT_COLORS.map(c => (
                <button key={c} type="button" onClick={() => setColor(c)}
                  style={{ width: 28, height: 28, borderRadius: '50%', background: c, border: color === c ? '3px solid #fff' : '3px solid transparent', cursor: 'pointer', boxSizing: 'border-box' }} />
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
            <button type="button" onClick={onClose} style={{ flex: 1, background: 'transparent', border: `1px solid ${C.border}`, borderRadius: 8, padding: '12px', color: C.muted, fontFamily: 'var(--sans)', fontSize: 14, cursor: 'pointer' }}>Cancel</button>
            <button type="submit" disabled={saving} style={{ flex: 2, background: C.accent, border: 'none', borderRadius: 8, padding: '12px', color: '#fff', fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500, cursor: 'pointer', opacity: saving ? 0.6 : 1 }}>
              {saving ? 'Saving…' : 'Save →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── Main Board ──────────────────────────────────────────────────────────── */
export default function PMBoard() {
  const { id: projectId } = useParams();
  const { profile }       = usePMAuth();

  const [project,   setProject]   = useState(null);
  const [tasks,     setTasks]     = useState([]);
  const [drawer,    setDrawer]    = useState(null);   // null | 'new:{colId}' | task object
  const [shareOpen, setShareOpen] = useState(false);
  const [editOpen,  setEditOpen]  = useState(false);
  const [loading,   setLoading]   = useState(true);

  const isAdmin = profile?.role === 'admin';

  // Subscribe to project metadata
  useEffect(() => {
    const ref = doc(db, 'projects', projectId);
    const unsub = onSnapshot(ref, snap => {
      if (snap.exists()) setProject({ id: snap.id, ...snap.data() });
      setLoading(false);
    });
    return unsub;
  }, [projectId]);

  // Subscribe to tasks
  useEffect(() => {
    const unsub = subscribeTasks(projectId, setTasks);
    return unsub;
  }, [projectId]);

  function colTasks(colId) { return tasks.filter(t => t.column === colId); }

  async function moveTask(task, direction) {
    const idx = COLUMNS.findIndex(c => c.id === task.column);
    const newCol = COLUMNS[idx + direction];
    if (!newCol) return;
    await updateTask(task.id, { column: newCol.id });
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.16em' }}>Loading…</span>
    </div>
  );

  if (!project) return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <p style={{ fontFamily: 'var(--mono)', color: C.muted }}>Project not found.</p>
      <a href="/pm" style={{ color: C.accent, fontFamily: 'var(--mono)', fontSize: 12 }}>← Back to dashboard</a>
    </div>
  );

  const totalTasks = tasks.length;
  const doneTasks  = tasks.filter(t => t.column === 'done').length;
  const progress   = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text, display: 'flex', flexDirection: 'column' }}>
      {/* ── Header ── */}
      <header style={{ borderBottom: `1px solid ${C.border}`, padding: '0 clamp(16px, 3vw, 32px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56, flexShrink: 0, position: 'sticky', top: 0, background: C.bg, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a href="/pm" style={{ fontFamily: 'var(--mono)', fontSize: 10, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.14em', textDecoration: 'none' }}>← Projects</a>
          <span style={{ color: C.border }}>·</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: C.green }} />
            <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: C.green, textTransform: 'uppercase', letterSpacing: '0.14em' }}>Kaart Studio</span>
          </div>
          <span style={{ color: C.border }}>·</span>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: project.color, flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--serif)', fontSize: 16, color: C.text }}>{project.name}</span>
          {project.client && <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: C.muted }}>· {project.client}</span>}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {/* progress */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 8 }}>
            <div style={{ width: 80, height: 4, background: '#d4e6dc', borderRadius: 99 }}>
              <div style={{ width: `${progress}%`, height: '100%', background: C.green, borderRadius: 99, transition: 'width 0.4s' }} />
            </div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: C.muted }}>{progress}%</span>
          </div>
          {isAdmin && (
            <button onClick={() => setEditOpen(true)}
              style={{ background: 'none', border: `1px solid ${C.border}`, borderRadius: 6, padding: '6px 12px', color: C.muted, fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer' }}>
              Edit
            </button>
          )}
          <button onClick={() => setShareOpen(true)}
            style={{ background: C.green, border: 'none', borderRadius: 6, padding: '6px 14px', color: '#fff', fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer' }}>
            Share ↗
          </button>
        </div>
      </header>

      {/* ── Board ── */}
      <div style={{ flex: 1, overflowX: 'auto', padding: 'clamp(16px, 3vw, 32px)' }}>
        <div style={{ display: 'flex', gap: 16, minWidth: 'max-content' }}>
          {COLUMNS.map((col, idx) => (
            <KanbanColumn
              key={col.id}
              col={col}
              tasks={colTasks(col.id)}
              colIndex={idx}
              onOpen={setDrawer}
              onAdd={() => setDrawer({ __new: true, column: col.id })}
              onMoveLeft={t => moveTask(t, -1)}
              onMoveRight={t => moveTask(t, 1)}
            />
          ))}
        </div>
      </div>

      {/* ── Drawers / Modals ── */}
      {drawer && (
        <TaskDrawer
          task={drawer.__new ? null : drawer}
          defaultColumn={drawer.__new ? drawer.column : drawer?.column}
          projectId={projectId}
          onClose={() => setDrawer(null)}
          isAdmin={isAdmin}
        />
      )}

      {shareOpen && <ShareModal token={project.shareToken} onClose={() => setShareOpen(false)} />}
      {editOpen  && isAdmin && <EditProjectModal project={project} onClose={() => setEditOpen(false)} />}
    </div>
  );
}
