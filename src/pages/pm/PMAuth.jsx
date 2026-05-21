import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, FB_READY } from '../../lib/firebase.js';

/* ─── Context ─────────────────────────────────────────────────────────────── */
const AuthCtx = createContext({ user: null, profile: null, loading: true });
export function usePMAuth() { return useContext(AuthCtx); }

export function PMAuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(FB_READY); // only show loading if Firebase is configured

  useEffect(() => {
    if (!FB_READY) return; // Firebase not configured yet — skip
    return onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        // Load or create team profile
        const ref = doc(db, 'team', u.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProfile(snap.data());
        } else {
          const p = { name: u.displayName || u.email.split('@')[0], email: u.email, role: 'dev', color: '#6c47ff' };
          await setDoc(ref, p);
          setProfile(p);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
  }, []);

  return <AuthCtx.Provider value={{ user, profile, loading }}>{children}</AuthCtx.Provider>;
}

/* ─── Protected route wrapper ─────────────────────────────────────────────── */
export function PMProtected({ children }) {
  const { user, loading } = usePMAuth();

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#f3f7f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#7a9e8a', textTransform: 'uppercase', letterSpacing: '0.16em' }}>Loading…</span>
    </div>
  );

  if (!user) {
    window.location.replace('/pm/login');
    return null;
  }

  return children;
}
