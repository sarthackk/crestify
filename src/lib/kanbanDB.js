import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  getDocs, getDoc, query, where, onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase.js';

function nanoid(n = 16) {
  return Array.from(crypto.getRandomValues(new Uint8Array(n)))
    .map(b => b.toString(36)).join('').slice(0, n);
}

/* ── Projects ─────────────────────────────────────────────────────────────── */

export async function createProject({ name, client, color = '#ff4d1f', assignees = [] }) {
  const ref = await addDoc(collection(db, 'projects'), {
    name, client, color, assignees,
    shareToken: nanoid(),
    status: 'active',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateProject(id, data) {
  await updateDoc(doc(db, 'projects', id), { ...data, updatedAt: serverTimestamp() });
}

export async function deleteProject(id) {
  const snap = await getDocs(query(collection(db, 'tasks'), where('projectId', '==', id)));
  await Promise.all(snap.docs.map(d => deleteDoc(d.ref)));
  await deleteDoc(doc(db, 'projects', id));
}

/** Live subscription — sort client-side so no composite index needed */
export function subscribeProjects(cb) {
  return onSnapshot(collection(db, 'projects'), snap => {
    const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    list.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
    cb(list);
  });
}

export async function getProjectByToken(token) {
  const q = query(collection(db, 'projects'), where('shareToken', '==', token));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() };
}

/* ── Tasks ────────────────────────────────────────────────────────────────── */

export async function createTask({ projectId, column = 'todo', title, description = '', assignee = '', priority = 'medium', tags = [], clientVisible = true }) {
  const ref = await addDoc(collection(db, 'tasks'), {
    projectId, column, title, description,
    assignee, priority, tags, clientVisible,
    order: Date.now(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateTask(id, data) {
  await updateDoc(doc(db, 'tasks', id), { ...data, updatedAt: serverTimestamp() });
}

export async function deleteTask(id) {
  await deleteDoc(doc(db, 'tasks', id));
}

/** Live subscription — filter + sort client-side, no composite index needed */
export function subscribeTasks(projectId, cb) {
  const q = query(collection(db, 'tasks'), where('projectId', '==', projectId));
  return onSnapshot(q, snap => {
    const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    list.sort((a, b) => (a.order || 0) - (b.order || 0));
    cb(list);
  });
}

/** For client view — fetch once, filter + sort client-side */
export async function getClientTasks(projectId) {
  const q = query(collection(db, 'tasks'), where('projectId', '==', projectId));
  const snap = await getDocs(q);
  return snap.docs
    .map(d => ({ id: d.id, ...d.data() }))
    .filter(t => t.clientVisible !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

/* ── Team ─────────────────────────────────────────────────────────────────── */

export async function getTeam() {
  const snap = await getDocs(collection(db, 'team'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
