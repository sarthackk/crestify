import { useState } from "react";

const sections = [
  {
    id: "overview",
    label: "Overview",
    icon: "◈",
  },
  {
    id: "user-flows",
    label: "User Flows",
    icon: "⟳",
  },
  {
    id: "features",
    label: "Feature Matrix",
    icon: "⊞",
  },
  {
    id: "screens",
    label: "Screen Map",
    icon: "⊡",
  },
  {
    id: "data",
    label: "Data Model",
    icon: "⊗",
  },
  {
    id: "tech",
    label: "Tech Stack",
    icon: "⌬",
  },
  {
    id: "timeline",
    label: "Timeline",
    icon: "◷",
  },
];

const Badge = ({ children, color = "sage" }) => {
  const colors = {
    sage: "background: #e8f0eb; color: #2d5a3d;",
    amber: "background: #fef3e2; color: #7a4f1a;",
    rose: "background: #fce8ec; color: #7a1f30;",
    slate: "background: #e8eaed; color: #3a3f4a;",
    violet: "background: #ede8f5; color: #3d2a6e;",
  };
  return (
    <span
      style={{
        ...Object.fromEntries(
          colors[color].split(";").filter(Boolean).map((s) => {
            const [k, v] = s.split(":").map((x) => x.trim());
            return [k === "background" ? "backgroundColor" : k, v];
          })
        ),
        padding: "2px 10px",
        borderRadius: "20px",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.04em",
        fontFamily: "'DM Mono', monospace",
        display: "inline-block",
      }}
    >
      {children}
    </span>
  );
};

const FlowStep = ({ number, title, desc, sub = [] }) => (
  <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
    <div
      style={{
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        background: "#2d5a3d",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "13px",
        fontWeight: 700,
        flexShrink: 0,
        fontFamily: "'DM Mono', monospace",
      }}
    >
      {number}
    </div>
    <div style={{ flex: 1 }}>
      <div
        style={{
          fontWeight: 700,
          color: "#1a2e22",
          fontSize: "15px",
          marginBottom: "3px",
          fontFamily: "'Fraunces', serif",
        }}
      >
        {title}
      </div>
      <div style={{ color: "#5a6b62", fontSize: "13.5px", lineHeight: 1.6 }}>
        {desc}
      </div>
      {sub.length > 0 && (
        <ul
          style={{
            marginTop: "8px",
            paddingLeft: "16px",
            color: "#5a6b62",
            fontSize: "13px",
            lineHeight: 1.8,
          }}
        >
          {sub.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

const FeatureRow = ({ feature, user, therapist, admin, priority }) => {
  const pColors = { High: "rose", Medium: "amber", Low: "slate" };
  return (
    <tr
      style={{
        borderBottom: "1px solid #e8f0eb",
        fontSize: "13.5px",
        color: "#3a4a40",
      }}
    >
      <td style={{ padding: "12px 16px", fontWeight: 500 }}>{feature}</td>
      <td style={{ padding: "12px 16px", textAlign: "center" }}>
        {user ? "✓" : "—"}
      </td>
      <td style={{ padding: "12px 16px", textAlign: "center" }}>
        {therapist ? "✓" : "—"}
      </td>
      <td style={{ padding: "12px 16px", textAlign: "center" }}>
        {admin ? "✓" : "—"}
      </td>
      <td style={{ padding: "12px 16px" }}>
        <Badge color={pColors[priority]}>{priority}</Badge>
      </td>
    </tr>
  );
};

const ScreenCard = ({ portal, screens, color }) => {
  const colors = {
    user: { bg: "#e8f0eb", accent: "#2d5a3d", dot: "#5a9a6e" },
    therapist: { bg: "#fef3e2", accent: "#7a4f1a", dot: "#d4850a" },
    admin: { bg: "#ede8f5", accent: "#3d2a6e", dot: "#7b5ea7" },
  };
  const c = colors[color];
  return (
    <div
      style={{
        background: "white",
        border: `1px solid ${c.bg}`,
        borderRadius: "16px",
        overflow: "hidden",
        flex: 1,
        minWidth: "220px",
      }}
    >
      <div
        style={{
          background: c.bg,
          padding: "16px 20px",
          fontFamily: "'Fraunces', serif",
          fontWeight: 700,
          color: c.accent,
          fontSize: "16px",
        }}
      >
        {portal}
      </div>
      <div style={{ padding: "16px 20px" }}>
        {screens.map((s, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "7px 0",
              borderBottom:
                i < screens.length - 1 ? "1px solid #f0f4f1" : "none",
              fontSize: "13px",
              color: "#3a4a40",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: c.dot,
                flexShrink: 0,
              }}
            />
            {s}
          </div>
        ))}
      </div>
    </div>
  );
};

const DataEntity = ({ entity, fields }) => (
  <div
    style={{
      background: "white",
      border: "1px solid #e0e8e3",
      borderRadius: "12px",
      overflow: "hidden",
      marginBottom: "12px",
    }}
  >
    <div
      style={{
        background: "#f4f8f5",
        padding: "10px 16px",
        fontFamily: "'DM Mono', monospace",
        fontWeight: 700,
        color: "#2d5a3d",
        fontSize: "13px",
        borderBottom: "1px solid #e0e8e3",
      }}
    >
      {entity}
    </div>
    <div
      style={{
        padding: "12px 16px",
        display: "flex",
        flexWrap: "wrap",
        gap: "6px",
      }}
    >
      {fields.map((f, i) => (
        <span
          key={i}
          style={{
            background: "#f4f8f5",
            padding: "3px 10px",
            borderRadius: "6px",
            fontSize: "12px",
            fontFamily: "'DM Mono', monospace",
            color: "#3a4a40",
          }}
        >
          {f}
        </span>
      ))}
    </div>
  </div>
);

const TechCard = ({ layer, stack, desc }) => (
  <div
    style={{
      background: "white",
      border: "1px solid #e0e8e3",
      borderRadius: "12px",
      padding: "18px",
      marginBottom: "10px",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "6px",
      }}
    >
      <div
        style={{
          fontWeight: 700,
          color: "#1a2e22",
          fontSize: "14px",
          fontFamily: "'Fraunces', serif",
        }}
      >
        {layer}
      </div>
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {stack.map((s, i) => (
          <Badge key={i} color="sage">
            {s}
          </Badge>
        ))}
      </div>
    </div>
    <div style={{ color: "#5a6b62", fontSize: "13px" }}>{desc}</div>
  </div>
);

const TimelinePhase = ({ phase, duration, weeks, items, color }) => {
  const colors = {
    sage: "#2d5a3d",
    amber: "#7a4f1a",
    violet: "#3d2a6e",
    rose: "#7a1f30",
  };
  return (
    <div
      style={{
        background: "white",
        border: "1px solid #e0e8e3",
        borderRadius: "16px",
        overflow: "hidden",
        marginBottom: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          padding: "16px 24px",
          borderBottom: "1px solid #e0e8e3",
          background: "#fafcfb",
        }}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            background: colors[color],
            flexShrink: 0,
          }}
        />
        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 700,
            color: "#1a2e22",
            fontSize: "16px",
            flex: 1,
          }}
        >
          {phase}
        </div>
        <Badge color={color === "sage" ? "sage" : color === "amber" ? "amber" : color === "violet" ? "violet" : "rose"}>
          {duration}
        </Badge>
        <span
          style={{
            color: "#8a9e92",
            fontSize: "12px",
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {weeks}
        </span>
      </div>
      <div style={{ padding: "16px 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "8px",
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                fontSize: "13px",
                color: "#3a4a40",
              }}
            >
              <span style={{ color: colors[color], marginTop: "1px" }}>→</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function PRD() {
  const [active, setActive] = useState("overview");

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: "#f4f8f5",
        minHeight: "100vh",
        color: "#1a2e22",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;600&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <div
        style={{
          background: "#1a2e22",
          padding: "32px 40px 28px",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                color: "#5a9a6e",
                fontSize: "11px",
                letterSpacing: "0.12em",
                marginBottom: "6px",
              }}
            >
              PRODUCT REQUIREMENTS DOCUMENT
            </div>
            <div
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: "28px",
                fontWeight: 900,
                color: "white",
                lineHeight: 1.1,
              }}
            >
              MindBridge
              <span
                style={{ color: "#5a9a6e", fontStyle: "italic", fontWeight: 400 }}
              >
                {" "}
                Therapy Platform
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Badge color="sage">v1.0 Draft</Badge>
            <Badge color="slate">3 Portals</Badge>
            <Badge color="amber">Mental Health</Badge>
          </div>
        </div>

        {/* Nav */}
        <div
          style={{
            maxWidth: "1100px",
            margin: "20px auto 0",
            display: "flex",
            gap: "4px",
            flexWrap: "wrap",
          }}
        >
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              style={{
                background: active === s.id ? "#2d5a3d" : "transparent",
                border: `1px solid ${active === s.id ? "#5a9a6e" : "#2d4a35"}`,
                color: active === s.id ? "white" : "#8ab89a",
                padding: "7px 14px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "12.5px",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "all 0.15s",
              }}
            >
              <span style={{ opacity: 0.8 }}>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px" }}>
        {/* OVERVIEW */}
        {active === "overview" && (
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: "24px",
                marginBottom: "32px",
              }}
            >
              <div
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "32px",
                  border: "1px solid #e0e8e3",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: "22px",
                    fontWeight: 700,
                    marginBottom: "16px",
                    color: "#1a2e22",
                  }}
                >
                  Project Overview
                </div>
                <p style={{ color: "#4a5e52", lineHeight: 1.8, fontSize: "14.5px", marginBottom: "16px" }}>
                  A full-scale mental health scheduling platform connecting clients with therapists through an intelligent matching system. The platform handles end-to-end scheduling — from a client's first visit and onboarding through therapist matching, session booking, video conferencing, and post-session notes.
                </p>
                <p style={{ color: "#4a5e52", lineHeight: 1.8, fontSize: "14.5px" }}>
                  Privacy is a core design principle: therapist identities are anonymized at the matching stage, revealed only after a client commits to booking. Admin oversight is comprehensive, enabling manual interventions and full visibility into the ecosystem.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  { label: "Portals", value: "3", sub: "User · Therapist · Admin" },
                  { label: "Core Flows", value: "7", sub: "End-to-end user journeys" },
                  { label: "Privacy Layer", value: "On", sub: "Anonymous matching" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      background: "white",
                      borderRadius: "16px",
                      padding: "20px 24px",
                      border: "1px solid #e0e8e3",
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontSize: "32px",
                        fontWeight: 900,
                        color: "#2d5a3d",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div style={{ fontWeight: 600, color: "#1a2e22", fontSize: "14px" }}>
                      {stat.label}
                    </div>
                    <div style={{ color: "#8a9e92", fontSize: "12px" }}>{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "32px",
                border: "1px solid #e0e8e3",
              }}
            >
              <div
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "20px",
                  fontWeight: 700,
                  marginBottom: "24px",
                  color: "#1a2e22",
                }}
              >
                Three Portals at a Glance
              </div>
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                {[
                  {
                    portal: "👤 Client Portal",
                    color: "#e8f0eb",
                    accent: "#2d5a3d",
                    points: [
                      "Landing page & sign-up",
                      "Onboarding intake form",
                      "Anonymous therapist recommendations",
                      "Booking & scheduling",
                      "Video session join",
                      "Ongoing relationship dashboard",
                    ],
                  },
                  {
                    portal: "🧑‍⚕️ Therapist Portal",
                    color: "#fef3e2",
                    accent: "#7a4f1a",
                    points: [
                      "Profile & credential setup",
                      "Availability calendar management",
                      "Incoming booking management",
                      "Session notes & remarks",
                      "Client history view",
                      "Earnings & session tracking",
                    ],
                  },
                  {
                    portal: "🛡️ Admin Portal",
                    color: "#ede8f5",
                    accent: "#3d2a6e",
                    points: [
                      "All sessions oversight",
                      "Manual therapist assignment",
                      "Client & therapist management",
                      "Session notes visibility",
                      "Platform analytics",
                      "Flagging & moderation",
                    ],
                  },
                ].map((p) => (
                  <div
                    key={p.portal}
                    style={{
                      flex: 1,
                      minWidth: "220px",
                      background: p.color,
                      borderRadius: "16px",
                      padding: "20px",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontWeight: 700,
                        color: p.accent,
                        fontSize: "15px",
                        marginBottom: "14px",
                      }}
                    >
                      {p.portal}
                    </div>
                    {p.points.map((pt, i) => (
                      <div
                        key={i}
                        style={{
                          fontSize: "13px",
                          color: "#3a4a40",
                          padding: "5px 0",
                          borderBottom: i < p.points.length - 1 ? `1px solid ${p.accent}22` : "none",
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ color: p.accent, fontSize: "10px" }}>◆</span>
                        {pt}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* USER FLOWS */}
        {active === "user-flows" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            {[
              {
                title: "Client Journey",
                color: "#e8f0eb",
                accent: "#2d5a3d",
                steps: [
                  { n: 1, title: "Landing Page", desc: "Visitor arrives at the marketing landing page. Clear value proposition, CTA to get started.", sub: [] },
                  { n: 2, title: "Sign Up / Auth", desc: "Email/password or social sign-up. Email verification.", sub: [] },
                  { n: 3, title: "Onboarding Intake Form", desc: "Structured questionnaire to match client with the right therapist.", sub: ["Mental health concerns / goals", "Preferred therapy type (CBT, DBT, etc.)", "Preferred session format (video, chat)", "Language & time zone", "Budget / insurance info", "Demographics (optional)"] },
                  { n: 4, title: "Therapist Recommendations", desc: "Algorithm surfaces 2–5 anonymized therapist cards.", sub: ["Specializations, qualifications, years of experience shown", "Name & photo hidden at this stage", "Match score / reason shown"] },
                  { n: 5, title: "Therapist Profile (Gated)", desc: "Client selects a recommendation to see the full (still anonymized) profile. Name revealed only at booking intent.", sub: [] },
                  { n: 6, title: "Book a Session", desc: "Client picks a slot from the therapist's live availability calendar.", sub: ["Slot confirmation & payment (if applicable)", "Calendar invite sent to both parties"] },
                  { n: 7, title: "Join Session", desc: "One-click join to integrated video conferencing (Whereby / Daily.co embed).", sub: [] },
                  { n: 8, title: "Post-Session Dashboard", desc: "Client sees connected therapist, session history, upcoming sessions.", sub: [] },
                ],
              },
              {
                title: "Therapist Journey",
                color: "#fef3e2",
                accent: "#7a4f1a",
                steps: [
                  { n: 1, title: "Application & Onboarding", desc: "Therapist applies with credentials. Admin reviews and approves.", sub: [] },
                  { n: 2, title: "Profile Setup", desc: "Therapist completes their profile.", sub: ["Specializations & modalities", "Credentials & licenses", "Bio & approach", "Session types offered", "Pricing per session"] },
                  { n: 3, title: "Availability Calendar", desc: "Therapist sets weekly availability (recurring or one-off). Blocks out unavailable slots.", sub: [] },
                  { n: 4, title: "Receive Booking", desc: "Notification when a client books. Therapist can confirm, reschedule, or cancel.", sub: [] },
                  { n: 5, title: "Join Session", desc: "One-click join to the same video room as the client.", sub: [] },
                  { n: 6, title: "Post-Session Notes", desc: "Therapist writes structured session notes immediately after the call.", sub: ["Session summary", "Client mood / progress notes", "Action items / homework", "Private remarks (admin-visible only)", "Next session recommendations"] },
                  { n: 7, title: "Dashboard", desc: "Overview of upcoming sessions, recent clients, and earnings.", sub: [] },
                ],
              },
              {
                title: "Admin Journey",
                color: "#ede8f5",
                accent: "#3d2a6e",
                steps: [
                  { n: 1, title: "Dashboard Overview", desc: "Real-time stats: sessions today, pending approvals, flagged items.", sub: [] },
                  { n: 2, title: "Therapist Management", desc: "Review applications, approve/suspend therapists, view full profiles.", sub: [] },
                  { n: 3, title: "Client Management", desc: "View client profiles, their intake forms, session history.", sub: [] },
                  { n: 4, title: "Manual Matching", desc: "Admin can override algorithm and manually assign a therapist to a client.", sub: [] },
                  { n: 5, title: "Session Oversight", desc: "View all scheduled, ongoing, and completed sessions. Access notes.", sub: [] },
                  { n: 6, title: "Notes & Remarks Review", desc: "Read therapist session notes and private remarks for quality assurance.", sub: [] },
                ],
                small: true,
              },
            ].map((flow, fi) => (
              <div
                key={fi}
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "28px",
                  border: "1px solid #e0e8e3",
                  gridColumn: fi === 2 ? "1 / -1" : undefined,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    marginBottom: "24px",
                    color: flow.accent,
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: flow.accent,
                      display: "inline-block",
                    }}
                  />
                  {flow.title}
                </div>
                {flow.steps.map((s) => (
                  <FlowStep key={s.n} number={s.n} title={s.title} desc={s.desc} sub={s.sub} />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* FEATURES */}
        {active === "features" && (
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              border: "1px solid #e0e8e3",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "28px 28px 20px" }}>
              <div
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#1a2e22",
                  marginBottom: "8px",
                }}
              >
                Feature Matrix
              </div>
              <p style={{ color: "#5a6b62", fontSize: "13.5px" }}>
                ✓ = feature available for this portal &nbsp;·&nbsp; — = not applicable
              </p>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f4f8f5", borderBottom: "2px solid #e0e8e3" }}>
                  {["Feature", "Client", "Therapist", "Admin", "Priority"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "12px 16px",
                        textAlign: h === "Feature" ? "left" : "center",
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#2d5a3d",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {h.toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Landing Page (Marketing)", true, false, false, "High"],
                  ["Sign Up / Login (Auth)", true, true, true, "High"],
                  ["Onboarding Intake Form", true, false, false, "High"],
                  ["Therapist Matching Algorithm", false, false, true, "High"],
                  ["Anonymized Therapist Cards", true, false, false, "High"],
                  ["Therapist Profile (Gated)", true, false, false, "High"],
                  ["Availability Calendar (Set)", false, true, false, "High"],
                  ["Availability Calendar (View/Book)", true, false, false, "High"],
                  ["Session Booking & Confirmation", true, true, true, "High"],
                  ["Video Conferencing (Integrated)", true, true, false, "High"],
                  ["Session Notes & Remarks", false, true, false, "High"],
                  ["Admin Notes Visibility", false, false, true, "High"],
                  ["Manual Therapist Assignment", false, false, true, "High"],
                  ["Therapist Profile Management", false, true, true, "High"],
                  ["Client Relationship Dashboard", true, false, false, "High"],
                  ["Therapist Dashboard (Upcoming)", false, true, false, "High"],
                  ["Admin Overview Dashboard", false, false, true, "High"],
                  ["Session History", true, true, true, "Medium"],
                  ["Notifications (Email + In-app)", true, true, true, "Medium"],
                  ["Reschedule / Cancel Flow", true, true, true, "Medium"],
                  ["Therapist Application Flow", false, true, true, "Medium"],
                  ["Payment / Billing", true, false, true, "Medium"],
                  ["Client Progress Tracking", true, true, false, "Medium"],
                  ["Therapist Approval Workflow", false, false, true, "Medium"],
                  ["Platform Analytics", false, false, true, "Medium"],
                  ["Flagging & Moderation", false, false, true, "Medium"],
                  ["Multi-language Support", true, true, false, "Low"],
                  ["Mobile Responsive", true, true, true, "High"],
                ].map(([feature, user, therapist, admin, priority], i) => (
                  <FeatureRow
                    key={i}
                    feature={feature}
                    user={user}
                    therapist={therapist}
                    admin={admin}
                    priority={priority}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* SCREENS */}
        {active === "screens" && (
          <div>
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "28px",
                border: "1px solid #e0e8e3",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#1a2e22",
                  marginBottom: "20px",
                }}
              >
                Screen Inventory
              </div>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <ScreenCard
                  portal="👤 Client Portal"
                  color="user"
                  screens={[
                    "Landing / Marketing Page",
                    "Sign Up / Login",
                    "Onboarding Intake Form (multi-step)",
                    "Therapist Recommendations List",
                    "Therapist Preview Card (modal)",
                    "Therapist Full Profile (gated)",
                    "Availability Calendar (read)",
                    "Booking Confirmation Screen",
                    "Payment Screen (if applicable)",
                    "Session Lobby / Join Screen",
                    "Video Session Room",
                    "Post-Session Feedback",
                    "Client Dashboard (Home)",
                    "My Therapist Page",
                    "Session History",
                    "Account Settings",
                  ]}
                />
                <ScreenCard
                  portal="🧑‍⚕️ Therapist Portal"
                  color="therapist"
                  screens={[
                    "Application / Registration",
                    "Therapist Onboarding (profile setup)",
                    "Dashboard (Home)",
                    "Availability Calendar (edit)",
                    "Upcoming Bookings List",
                    "Booking Detail View",
                    "Session Join Screen",
                    "Video Session Room",
                    "Post-Session Notes Form",
                    "Client History View",
                    "My Profile (edit)",
                    "Earnings Overview",
                    "Notifications",
                    "Account Settings",
                  ]}
                />
                <ScreenCard
                  portal="🛡️ Admin Portal"
                  color="admin"
                  screens={[
                    "Admin Dashboard (KPIs)",
                    "All Sessions List (filterable)",
                    "Session Detail View",
                    "Client List (searchable)",
                    "Client Detail & Profile",
                    "Manual Therapist Assignment",
                    "Therapist List (searchable)",
                    "Therapist Detail & Profile",
                    "Therapist Application Review",
                    "Session Notes Viewer",
                    "Platform Analytics",
                    "Flagging & Moderation Queue",
                    "Settings / Configuration",
                  ]}
                />
              </div>
            </div>

            {/* Key UX Callouts */}
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "28px",
                border: "1px solid #e0e8e3",
              }}
            >
              <div
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#1a2e22",
                  marginBottom: "20px",
                }}
              >
                Key UX & Privacy Decisions
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {[
                  {
                    title: "Anonymized Matching",
                    desc: "Therapist name and photo are hidden during the recommendation phase. Only specializations, credentials, and match rationale are shown. Identity is revealed at booking intent.",
                    badge: "Privacy",
                    color: "violet",
                  },
                  {
                    title: "Multi-Step Intake Form",
                    desc: "The onboarding form should be broken into digestible steps with progress indication. Completion rate is critical — consider auto-save and the ability to resume.",
                    badge: "UX",
                    color: "sage",
                  },
                  {
                    title: "Therapist Availability as Source of Truth",
                    desc: "Therapists set their calendar once (recurring or specific dates). The system prevents double-bookings and auto-disables slots as they fill.",
                    badge: "Scheduling",
                    color: "amber",
                  },
                  {
                    title: "Session Notes Access Control",
                    desc: "Therapist session notes are visible to admin but NOT to clients. Private remarks field is strictly admin-only. This must be enforced at the API level, not just UI.",
                    badge: "Compliance",
                    color: "rose",
                  },
                ].map((c, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#fafcfb",
                      border: "1px solid #e0e8e3",
                      borderRadius: "12px",
                      padding: "20px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 700,
                          color: "#1a2e22",
                          fontSize: "14px",
                          fontFamily: "'Fraunces', serif",
                        }}
                      >
                        {c.title}
                      </div>
                      <Badge color={c.color}>{c.badge}</Badge>
                    </div>
                    <div style={{ color: "#5a6b62", fontSize: "13px", lineHeight: 1.7 }}>
                      {c.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* DATA MODEL */}
        {active === "data" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div>
              <div
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#1a2e22",
                  marginBottom: "16px",
                }}
              >
                Core Entities
              </div>
              <DataEntity
                entity="User (Client)"
                fields={["id", "email", "password_hash", "name", "phone", "timezone", "created_at", "onboarding_completed"]}
              />
              <DataEntity
                entity="IntakeForm"
                fields={["id", "user_id", "mental_health_concerns[]", "therapy_type_pref", "session_format_pref", "language", "budget_range", "demographics_json", "submitted_at"]}
              />
              <DataEntity
                entity="Therapist"
                fields={["id", "email", "name", "photo_url", "bio", "specializations[]", "credentials[]", "license_number", "years_experience", "session_price", "status (pending|active|suspended)"]}
              />
              <DataEntity
                entity="TherapistAvailability"
                fields={["id", "therapist_id", "day_of_week", "start_time", "end_time", "is_recurring", "specific_date (nullable)", "slot_duration_mins"]}
              />
              <DataEntity
                entity="Match"
                fields={["id", "user_id", "therapist_id", "match_score", "match_reason", "status (suggested|accepted|declined)", "suggested_by (algorithm|admin)", "created_at"]}
              />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#1a2e22",
                  marginBottom: "16px",
                }}
              >
                Transactional Entities
              </div>
              <DataEntity
                entity="Session (Booking)"
                fields={["id", "user_id", "therapist_id", "match_id", "scheduled_at", "duration_mins", "status (scheduled|ongoing|completed|cancelled)", "conference_room_id", "join_url", "payment_id"]}
              />
              <DataEntity
                entity="SessionNote"
                fields={["id", "session_id", "therapist_id", "summary", "mood_rating", "progress_notes", "action_items", "private_remarks (admin-only)", "next_session_rec", "created_at"]}
              />
              <DataEntity
                entity="Payment"
                fields={["id", "session_id", "user_id", "amount", "currency", "status", "stripe_payment_intent_id", "paid_at"]}
              />
              <DataEntity
                entity="Notification"
                fields={["id", "recipient_id", "recipient_type", "type", "title", "body", "read", "sent_at"]}
              />
              <DataEntity
                entity="Admin"
                fields={["id", "email", "name", "role (super_admin|moderator)", "created_at"]}
              />

              <div
                style={{
                  background: "#f4f8f5",
                  borderRadius: "12px",
                  padding: "20px",
                  marginTop: "8px",
                  border: "1px solid #e0e8e3",
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: 700,
                    fontSize: "11px",
                    color: "#2d5a3d",
                    letterSpacing: "0.08em",
                    marginBottom: "10px",
                  }}
                >
                  SECURITY NOTE
                </div>
                <div style={{ color: "#4a5e52", fontSize: "13px", lineHeight: 1.7 }}>
                  SessionNote.private_remarks must be excluded from all client-facing API responses at the serializer level. Role-based access control (RBAC) must gate every endpoint. Therapist identity fields should be conditionally included only post-booking.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TECH STACK */}
        {active === "tech" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div>
              <div
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#1a2e22",
                  marginBottom: "16px",
                }}
              >
                Recommended Stack
              </div>
              <TechCard layer="Frontend" stack={["Next.js 14", "TypeScript", "Tailwind CSS"]} desc="Three separate apps (or a monorepo with route-based portals) for Client, Therapist, Admin. App Router for server components and streaming." />
              <TechCard layer="Backend / API" stack={["Node.js", "tRPC or REST", "Prisma ORM"]} desc="Type-safe API layer. tRPC preferred for tight frontend-backend type sharing. Prisma for database access with migrations." />
              <TechCard layer="Database" stack={["PostgreSQL", "Redis"]} desc="PostgreSQL for relational data. Redis for session caching, real-time presence, and rate limiting." />
              <TechCard layer="Auth" stack={["NextAuth.js", "JWT"]} desc="Role-based sessions for three distinct user types. Social login optional. Refresh token rotation for security." />
              <TechCard layer="Video Conferencing" stack={["Daily.co", "Whereby"]} desc="Embedded video rooms generated per session. No self-hosting required. Daily.co offers recording capabilities if needed." />
              <TechCard layer="Scheduling" stack={["Custom", "Cal.com OSS"]} desc="Consider Cal.com's open-source core for availability logic, or build a custom availability + booking engine on top of the data model above." />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#1a2e22",
                  marginBottom: "16px",
                }}
              >
                Services & Infrastructure
              </div>
              <TechCard layer="Payments" stack={["Stripe"]} desc="Stripe Checkout or Payment Intents for session payments. Stripe Connect for therapist payouts if platform takes a cut." />
              <TechCard layer="Email / Notifications" stack={["Resend", "Novu"]} desc="Resend for transactional email (booking confirmations, reminders). Novu for multi-channel (email + in-app) notification orchestration." />
              <TechCard layer="File Storage" stack={["AWS S3", "Cloudflare R2"]} desc="Therapist credential documents, profile photos. Presigned URLs for secure access." />
              <TechCard layer="Hosting" stack={["Vercel", "Railway"]} desc="Vercel for Next.js frontends. Railway or Render for the API server and Postgres. Redis via Upstash." />
              <TechCard layer="Monitoring" stack={["Sentry", "PostHog"]} desc="Sentry for error tracking across all three portals. PostHog for product analytics and funnel analysis (onboarding drop-off etc.)." />
              <TechCard layer="Testing" stack={["Vitest", "Playwright"]} desc="Unit and integration tests with Vitest. End-to-end critical flows (booking, notes) with Playwright." />

              <div
                style={{
                  background: "#fef3e2",
                  borderRadius: "12px",
                  padding: "20px",
                  marginTop: "8px",
                  border: "1px solid #f5deb3",
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: 700,
                    fontSize: "11px",
                    color: "#7a4f1a",
                    letterSpacing: "0.08em",
                    marginBottom: "10px",
                  }}
                >
                  COMPLIANCE CONSIDERATION
                </div>
                <div style={{ color: "#5a3a1a", fontSize: "13px", lineHeight: 1.7 }}>
                  Mental health platforms may be subject to HIPAA (US), GDPR (EU), or local equivalents depending on the client's market. Confirm jurisdiction early — this affects data residency, encryption requirements, BAA agreements, and audit logging.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TIMELINE */}
        {active === "timeline" && (
          <div>
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "28px",
                border: "1px solid #e0e8e3",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#1a2e22",
                  marginBottom: "8px",
                }}
              >
                Suggested Build Phases
              </div>
              <p style={{ color: "#5a6b62", fontSize: "13.5px", marginBottom: "24px" }}>
                Estimated for a 2-3 developer team. Timelines are approximate and should be validated against your team's capacity.
              </p>

              <TimelinePhase
                phase="Phase 1 — Foundation"
                duration="2 weeks"
                weeks="Weeks 1–2"
                color="sage"
                items={[
                  "Monorepo + project setup",
                  "Auth (all 3 roles)",
                  "Database schema & migrations",
                  "Therapist profile & onboarding",
                  "Client intake form",
                  "Basic admin panel",
                  "Landing page (marketing)",
                ]}
              />
              <TimelinePhase
                phase="Phase 2 — Matching & Scheduling"
                duration="2 weeks"
                weeks="Weeks 3–4"
                color="amber"
                items={[
                  "Matching algorithm (rule-based v1)",
                  "Anonymized therapist cards",
                  "Gated therapist profile",
                  "Availability calendar (therapist)",
                  "Booking flow (client)",
                  "Booking management (therapist)",
                  "Admin manual assignment",
                ]}
              />
              <TimelinePhase
                phase="Phase 3 — Sessions & Video"
                duration="1 week"
                weeks="Week 5"
                color="violet"
                items={[
                  "Video conferencing integration",
                  "Session join flow",
                  "Post-session notes (therapist)",
                  "Notes viewer (admin)",
                  "Notifications (email + in-app)",
                  "Payments (Stripe)",
                  "Session history dashboards",
                ]}
              />
              <TimelinePhase
                phase="Phase 4 — Polish & Launch"
                duration="1 week"
                weeks="Week 6"
                color="rose"
                items={[
                  "Reschedule / cancellation flows",
                  "Mobile responsiveness audit",
                  "End-to-end QA",
                  "Performance & security audit",
                  "Compliance review",
                  "Analytics setup",
                  "Staging → Production deploy",
                ]}
              />
            </div>

            <div
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "28px",
                border: "1px solid #e0e8e3",
              }}
            >
              <div
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#1a2e22",
                  marginBottom: "20px",
                }}
              >
                Open Questions to Clarify with Client
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {[
                  "Is payment collected through the platform, or handled externally?",
                  "What matching criteria matter most — specialization, availability, price, or a weighted score?",
                  "Should session recording be supported? (Legal implications vary by region)",
                  "Does the platform take a commission on sessions? (Affects Stripe Connect setup)",
                  "What jurisdiction(s) will the platform operate in? (HIPAA / GDPR considerations)",
                  "Will therapists be employed by the startup, or independent contractors?",
                  "Is there a messaging / chat feature needed between sessions?",
                  "Should clients be able to switch therapists? What's the flow?",
                  "Does the admin need reporting / CSV exports for compliance?",
                  "Is multi-language support required at launch?",
                ].map((q, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#fafcfb",
                      border: "1px solid #e0e8e3",
                      borderRadius: "10px",
                      padding: "14px 16px",
                      fontSize: "13px",
                      color: "#3a4a40",
                      display: "flex",
                      gap: "10px",
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        color: "#2d5a3d",
                        fontWeight: 700,
                        fontSize: "11px",
                        marginTop: "1px",
                        flexShrink: 0,
                      }}
                    >
                      Q{i + 1}
                    </span>
                    {q}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
