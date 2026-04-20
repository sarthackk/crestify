// Contact.jsx — contact page

function HeroContact() {
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const tor = now.toLocaleTimeString('en-US', { hour12: false, timeZone: 'America/Toronto' });
  const lon = now.toLocaleTimeString('en-US', { hour12: false, timeZone: 'Europe/London' });
  return (
    <section style={{ paddingTop: 64, paddingBottom: 'clamp(40px, 5vw, 60px)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 40 }}>
          <Eyebrow index="01">Start a project</Eyebrow>
          <div style={{ display: 'flex', gap: 28 }}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>● TOR · {tor}</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>● LON · {lon}</div>
          </div>
        </div>
        <h1 className="display" style={{ maxWidth: '14ch' }}>
          Tell us where <span className="italic" style={{ color: 'var(--ink-3)' }}>you're stuck.</span>
        </h1>
        <p className="body-lg" style={{ marginTop: 28, maxWidth: '54ch' }}>
          Send a few sentences. Both founders read every inbound. We'll reply within 48 hours with a yes, a no, or a clarifying question — never with a templated brochure.
        </p>
      </div>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = React.useState({
    name: '', company: '', email: '', service: '', budget: '', timeline: '', brief: '',
  });
  const [touched, setTouched] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);

  const services = ['Commerce systems', 'Software platforms', 'Embedded team', 'Not sure yet'];
  const budgets = ['<$50k', '$50k–$150k', '$150k–$500k', '$500k+'];
  const timelines = ['ASAP', 'Next quarter', '6+ months out', 'Just exploring'];

  const update = (k, v) => setForm({ ...form, [k]: v });
  const isInvalid = (k) => touched[k] && !form[k];
  const canSubmit = form.name && form.email && form.brief && form.brief.length > 20;

  const submit = (e) => {
    e.preventDefault();
    if (!canSubmit) {
      setTouched({ name: true, email: true, brief: true });
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="section-pad-sm" style={{ borderTop: '1px solid var(--line-strong)' }}>
        <div className="container">
          <div style={{
            background: 'var(--bg-elev)',
            border: '1px solid var(--line-strong)',
            padding: 'clamp(40px, 6vw, 80px)',
            borderRadius: 4,
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'var(--gap)',
          }}>
            <div style={{ gridColumn: 'span 4' }}>
              <Eyebrow>Status · received</Eyebrow>
              <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', marginTop: 12, textTransform: 'uppercase', letterSpacing: '0.12em' }}>● Brief logged · #CR-{Math.floor(Math.random()*9000+1000)}</div>
            </div>
            <div style={{ gridColumn: 'span 8' }}>
              <h2 className="h2">
                Thanks, {form.name.split(' ')[0]}. <span className="italic" style={{ color: 'var(--ink-3)' }}>We're on it.</span>
              </h2>
              <p className="body-lg" style={{ marginTop: 20, maxWidth: '50ch' }}>
                Both founders will read your brief in the next 24 hours and reply within 48. If we're a fit you'll get a calendar link. If we're not, you'll get a referral.
              </p>
              <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
                <a href="work.html" className="btn btn-primary">See selected work <span className="arr">→</span></a>
                <a href="index.html" className="btn btn-ghost">Back to home</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const fieldStyle = {
    width: '100%',
    padding: '14px 0',
    border: 'none',
    borderBottom: '1px solid var(--line-strong)',
    background: 'transparent',
    fontFamily: 'var(--sans)',
    fontSize: 17,
    color: 'var(--ink)',
    outline: 'none',
    transition: 'border-color 0.2s',
  };
  const labelStyle = {
    fontFamily: 'var(--mono)',
    fontSize: 11,
    color: 'var(--ink-4)',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    marginBottom: 4,
    display: 'block',
  };
  const groupStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const Pills = ({ field, options }) => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
      {options.map(o => (
        <button key={o} type="button"
          onClick={() => update(field, o)}
          className="mono"
          style={{
            padding: '10px 14px',
            border: '1px solid ' + (form[field] === o ? 'var(--ink)' : 'var(--line-strong)'),
            background: form[field] === o ? 'var(--ink)' : 'transparent',
            color: form[field] === o ? 'var(--bg)' : 'var(--ink-2)',
            borderRadius: 999,
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >{o}</button>
      ))}
    </div>
  );

  return (
    <section className="section-pad-sm" style={{ borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--gap)' }}>
          <aside style={{ gridColumn: 'span 4' }}>
            <Eyebrow index="02">Brief us</Eyebrow>
            <p className="serif" style={{ fontSize: 28, lineHeight: 1.18, marginTop: 22, fontStyle: 'italic' }}>
              Six fields. The more specific, the faster we can say yes or no.
            </p>
            <div style={{ marginTop: 40, padding: 20, border: '1px solid var(--line-strong)', borderRadius: 4 }}>
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Or skip the form</div>
              <a href="mailto:hello@crestify.co" className="serif" style={{ fontSize: 22, marginTop: 8, display: 'block', textDecoration: 'underline' }}>hello@crestify.co</a>
              <div className="small" style={{ marginTop: 12 }}>
                NDA available on request. Encrypted briefs accepted.
              </div>
            </div>
          </aside>

          <form onSubmit={submit} style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
              <div style={groupStyle}>
                <label style={labelStyle}>01 / Your name *</label>
                <input style={{ ...fieldStyle, borderColor: isInvalid('name') ? 'var(--accent)' : 'var(--line-strong)' }}
                  value={form.name}
                  onChange={e => update('name', e.target.value)}
                  onBlur={() => setTouched({ ...touched, name: true })}
                  placeholder="Jane Doe" />
              </div>
              <div style={groupStyle}>
                <label style={labelStyle}>02 / Company</label>
                <input style={fieldStyle} value={form.company} onChange={e => update('company', e.target.value)} placeholder="Acme Inc." />
              </div>
            </div>

            <div style={groupStyle}>
              <label style={labelStyle}>03 / Email *</label>
              <input type="email" style={{ ...fieldStyle, borderColor: isInvalid('email') ? 'var(--accent)' : 'var(--line-strong)' }}
                value={form.email} onChange={e => update('email', e.target.value)}
                onBlur={() => setTouched({ ...touched, email: true })}
                placeholder="jane@acme.co" />
            </div>

            <div style={groupStyle}>
              <label style={labelStyle}>04 / What kind of help?</label>
              <Pills field="service" options={services} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
              <div style={groupStyle}>
                <label style={labelStyle}>05 / Budget range</label>
                <Pills field="budget" options={budgets} />
              </div>
              <div style={groupStyle}>
                <label style={labelStyle}>06 / Timeline</label>
                <Pills field="timeline" options={timelines} />
              </div>
            </div>

            <div style={groupStyle}>
              <label style={labelStyle}>07 / The brief * <span style={{ color: 'var(--ink-4)', textTransform: 'none', letterSpacing: 0 }}>· min 20 chars · {form.brief.length}</span></label>
              <textarea
                rows={6}
                style={{
                  ...fieldStyle,
                  resize: 'vertical',
                  padding: '14px 0',
                  borderColor: isInvalid('brief') ? 'var(--accent)' : 'var(--line-strong)',
                  fontFamily: 'var(--sans)',
                }}
                value={form.brief}
                onChange={e => update('brief', e.target.value)}
                onBlur={() => setTouched({ ...touched, brief: true })}
                placeholder="What are you trying to ship? What's blocking you? What does success look like in 90 days?"
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap', paddingTop: 12 }}>
              <div className="small">
                By sending this you agree to our <a href="#" style={{ textDecoration: 'underline' }}>privacy notice</a>. We don't share briefs.
              </div>
              <button type="submit" className="btn btn-accent" style={{ fontSize: 16, padding: '18px 28px', opacity: canSubmit ? 1 : 0.5 }}>
                Send the brief <span className="arr">→</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactSecondary() {
  const blocks = [
    { eyebrow: 'For press', t: 'press@crestify.co', d: 'Founder bios, hi-res portraits, and brand assets on request.' },
    { eyebrow: 'For partnerships', t: 'partners@crestify.co', d: 'Tooling vendors, agencies seeking referrals, ecosystem partners.' },
    { eyebrow: 'For careers', t: 'team@crestify.co', d: 'We hire 1–2 senior operators a year. Always reading.' },
  ];
  return (
    <section className="section-pad" style={{ background: 'var(--bg-elev)', borderTop: '1px solid var(--line-strong)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--gap)', marginBottom: 40 }}>
          <div style={{ gridColumn: 'span 4' }}>
            <Eyebrow index="03">Other inboxes</Eyebrow>
          </div>
          <h2 className="h2" style={{ gridColumn: 'span 8' }}>
            Not a project? <span className="italic" style={{ color: 'var(--ink-3)' }}>Pick a door.</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--gap)' }}>
          {blocks.map(b => (
            <div key={b.t} style={{
              padding: 'clamp(24px, 3vw, 36px)',
              border: '1px solid var(--line-strong)',
              borderRadius: 4,
              background: 'var(--bg)',
            }}>
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{b.eyebrow}</div>
              <a href={`mailto:${b.t}`} className="serif" style={{ fontSize: 24, marginTop: 14, display: 'block', textDecoration: 'underline' }}>{b.t}</a>
              <p className="body" style={{ marginTop: 12, fontSize: 14.5 }}>{b.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <div className="page">
      <Nav active="contact" />
      <HeroContact />
      <ContactForm />
      <ContactSecondary />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ContactPage />);
