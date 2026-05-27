/* All 5 pages as React components. */

const { useState, useEffect, useRef } = React;

/* ============================================================
   SHARED PRIMITIVES
   ============================================================ */

function Footer() {
  return (
    <footer className="footer">
      <span>© 2026 — {window.PROFILE.name}</span>
      <span>Construit avec Rails 7.2 · Hotwire · ❤︎ </span>
    </footer>
  );
}

/* ============================================================
   PAGE: HOME (/)
   ============================================================ */

function HomePage({ navigate }) {
  const core = window.STACK.filter(s => s.level === "core");
  const tools = window.STACK.filter(s => s.level === "tools");

  return (
    <div className="page">
      <section style={{
        minHeight: "calc(100vh - 86px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "48px 48px 60px",
        position: "relative",
      }}>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 1fr)",
            gap: "56px",
            alignItems: "center",
          }}>
            {/* LEFT — Identity */}
            <div>
              <AvailabilityBadge />

              <h1 className="display" style={{
                fontSize: "clamp(54px, 7vw, 104px)",
                marginTop: "28px",
                marginBottom: "20px",
              }}>
                {window.PROFILE.name.split(" ")[0]}{" "}
                <span className="it">{window.PROFILE.name.split(" ")[1]}</span>
              </h1>

              <p style={{
                fontFamily: "var(--mono)",
                fontSize: "13px",
                letterSpacing: "0.08em",
                color: "var(--text-mute)",
                marginBottom: "28px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                flexWrap: "wrap",
              }}>
                <span>{window.PROFILE.role}</span>
                <span style={{ color: "var(--text-dim)" }}>·</span>
                <span>{window.PROFILE.location}</span>
                <span style={{ color: "var(--text-dim)" }}>·</span>
                <span>5+ ans d'expérience web</span>
              </p>

              <p style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(20px, 2.1vw, 26px)",
                lineHeight: 1.4,
                color: "var(--text)",
                marginBottom: "44px",
                maxWidth: "540px",
              }}>
                Je construis des applications web <span style={{ color: "var(--accent)", fontStyle: "italic" }}>robustes</span>, lisibles, et qui durent — avec Rails, Hotwire et un sens du détail.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "48px" }}>
                <a href="#/projects" onClick={(e) => { e.preventDefault(); navigate("/projects"); }} className="btn btn-primary">
                  Voir mes projets <span className="arrow">→</span>
                </a>
                <a href="#/contact" onClick={(e) => { e.preventDefault(); navigate("/contact"); }} className="btn">
                  Me contacter
                </a>
                <a href="cv.pdf" className="btn" style={{ borderStyle: "dashed" }}>
                  Télécharger le CV ↓
                </a>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <StackRow label="Stack principale" items={core} accent />
                <StackRow label="Outils" items={tools} />
              </div>
            </div>

            {/* RIGHT — Photo + proof points */}
            <aside style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <PhotoFrame />
              <ProofGrid />
            </aside>
          </div>
        </div>
      </section>

      <FeaturedProjects navigate={navigate} />
      <WhatIDo />

      <Footer />
    </div>
  );
}

function FeaturedProjects({ navigate }) {
  const featured = window.PROJECTS.slice(0, 2);
  return (
    <section style={{
      padding: "80px 48px 40px",
      borderTop: "1px solid var(--line-soft)",
      position: "relative",
      zIndex: 2,
    }}>
      <div className="container">
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "36px",
          flexWrap: "wrap",
          gap: "20px",
        }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: "16px" }}>Projets phares</div>
            <h2 className="display" style={{ fontSize: "clamp(36px, 4.5vw, 56px)" }}>
              Deux pour la <span className="it">route</span>.
            </h2>
          </div>
          <a href="#/projects" onClick={(e) => { e.preventDefault(); navigate("/projects"); }} className="btn">
            Tous les projets <span className="arrow">→</span>
          </a>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
        }}>
          {featured.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} navigate={navigate} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatIDo() {
  const items = [
    {
      n: "01",
      title: "Construire",
      body: "Des applications Rails complètes, du modèle à l'interface. Hotwire pour rester rapide et lisible. Tests RSpec à chaque étape critique.",
    },
    {
      n: "02",
      title: "Livrer",
      body: "Déployer sur Hatchbox, Fly.io ou Heroku. CI GitHub Actions, monitoring Sentry, backups réguliers. Ce qui part en prod tient en prod.",
    },
    {
      n: "03",
      title: "Maintenir",
      body: "Reprendre une codebase existante, comprendre sa dette technique, la documenter, et la faire évoluer sans tout casser. Le 90% du métier.",
    },
  ];
  return (
    <section style={{
      padding: "60px 48px 80px",
      position: "relative",
      zIndex: 2,
    }}>
      <div className="container">
        <div style={{ marginBottom: "40px" }}>
          <div className="eyebrow" style={{ marginBottom: "16px" }}>Ce que je fais bien</div>
          <h2 className="display" style={{ fontSize: "clamp(36px, 4.5vw, 56px)", maxWidth: "640px" }}>
            Trois choses, pas <span className="it">douze</span>.
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          background: "var(--line-soft)",
          border: "1px solid var(--line-soft)",
          borderRadius: "16px",
          overflow: "hidden",
        }}>
          {items.map((it) => (
            <div key={it.n} style={{
              background: "oklch(0.08 0.015 95 / 0.6)",
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}>
              <div style={{
                fontFamily: "var(--mono)",
                fontSize: "11px",
                letterSpacing: "0.16em",
                color: "var(--accent)",
              }}>{it.n}</div>
              <h3 style={{
                fontFamily: "var(--serif)",
                fontSize: "32px",
                fontWeight: 400,
                letterSpacing: "-0.01em",
              }}>{it.title}</h3>
              <p style={{
                fontSize: "14.5px",
                lineHeight: 1.65,
                color: "var(--text-mute)",
              }}>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AvailabilityBadge() {
  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      padding: "7px 14px 7px 12px",
      borderRadius: "999px",
      background: "oklch(0.87 0.18 95 / 0.08)",
      border: "1px solid oklch(0.87 0.18 95 / 0.35)",
      fontFamily: "var(--mono)",
      fontSize: "11px",
      letterSpacing: "0.08em",
      color: "var(--accent)",
    }}>
      <span style={{
        width: "8px", height: "8px",
        borderRadius: "50%",
        background: "var(--accent)",
        boxShadow: "0 0 10px var(--accent-glow), 0 0 20px var(--accent-glow)",
        animation: "pulse 2.4s ease-in-out infinite",
      }}></span>
      Disponible · CDI / Freelance
      <style>{`
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </div>
  );
}

function PhotoFrame() {
  return (
    <div style={{
      position: "relative",
      borderRadius: "20px",
      overflow: "hidden",
      border: "1px solid var(--line)",
      boxShadow: "0 24px 80px oklch(0 0 0 / 0.5), 0 0 60px oklch(0.87 0.18 95 / 0.08)",
      background: "var(--surface)",
      aspectRatio: "4 / 5",
      width: "100%",
      display: "flex",
    }}>
      {/* Corner crosshairs */}
      <Corner pos="tl" />
      <Corner pos="tr" />
      <Corner pos="bl" />
      <Corner pos="br" />

      <image-slot
        id="profile-photo"
        shape="rect"
        placeholder="Dépose ta photo ici"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          flex: 1,
        }}
      ></image-slot>

      {/* Label strip */}
      <div style={{
        position: "absolute",
        bottom: "14px",
        left: "14px",
        right: "14px",
        padding: "10px 14px",
        borderRadius: "10px",
        background: "oklch(0.05 0.012 95 / 0.78)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid var(--line-soft)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "var(--mono)",
        fontSize: "10.5px",
        letterSpacing: "0.06em",
        color: "var(--text-mute)",
        pointerEvents: "none",
      }}>
        <span>{window.PROFILE.name}</span>
        <span style={{ color: "var(--accent)" }}>RB.{new Date().getFullYear()}</span>
      </div>
    </div>
  );
}

function Corner({ pos }) {
  const styles = {
    tl: { top: "10px", left: "10px", borderTop: "1px solid var(--accent)", borderLeft: "1px solid var(--accent)" },
    tr: { top: "10px", right: "10px", borderTop: "1px solid var(--accent)", borderRight: "1px solid var(--accent)" },
    bl: { bottom: "10px", left: "10px", borderBottom: "1px solid var(--accent)", borderLeft: "1px solid var(--accent)" },
    br: { bottom: "10px", right: "10px", borderBottom: "1px solid var(--accent)", borderRight: "1px solid var(--accent)" },
  };
  return (
    <span style={{
      position: "absolute",
      width: "14px", height: "14px",
      zIndex: 3,
      pointerEvents: "none",
      ...styles[pos],
    }}></span>
  );
}

function ProofGrid() {
  const items = [
    { value: "4", label: "projets en production" },
    { value: "2024", label: "première ligne de Ruby" },
    { value: "100%", label: "remote-friendly" },
  ];
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "1px",
      background: "var(--line-soft)",
      border: "1px solid var(--line-soft)",
      borderRadius: "12px",
      overflow: "hidden",
    }}>
      {items.map((it, i) => (
        <div key={i} style={{
          background: "oklch(0.08 0.015 95 / 0.6)",
          padding: "18px 14px",
          backdropFilter: "blur(6px)",
        }}>
          <div style={{
            fontFamily: "var(--serif)",
            fontSize: "30px",
            color: "var(--accent)",
            lineHeight: 1,
            marginBottom: "8px",
          }}>{it.value}</div>
          <div style={{
            fontFamily: "var(--mono)",
            fontSize: "10px",
            letterSpacing: "0.04em",
            color: "var(--text-mute)",
            lineHeight: 1.4,
          }}>{it.label}</div>
        </div>
      ))}
    </div>
  );
}

function StackRow({ label, items, accent }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
      <span style={{
        fontFamily: "var(--mono)",
        fontSize: "11px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--text-dim)",
        width: "140px",
        flexShrink: 0,
      }}>
        ↳ {label}
      </span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {items.map(item => (
          <span key={item.name} style={{
            fontFamily: "var(--mono)",
            fontSize: "12px",
            padding: "6px 12px",
            borderRadius: "999px",
            border: `1px solid ${accent ? "oklch(0.87 0.18 95 / 0.35)" : "var(--line-soft)"}`,
            background: accent ? "oklch(0.87 0.18 95 / 0.06)" : "transparent",
            color: accent ? "var(--accent)" : "var(--text-mute)",
          }}>
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
}

function ScrollIndicator() {
  return (
    <div style={{
      position: "absolute",
      bottom: "32px",
      left: "50%",
      transform: "translateX(-50%)",
      fontFamily: "var(--mono)",
      fontSize: "10px",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "var(--text-dim)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "8px",
      opacity: 0.7,
    }}>
      <span>04 pages de plus</span>
      <span style={{
        display: "inline-block",
        width: "1px",
        height: "32px",
        background: "linear-gradient(180deg, var(--accent), transparent)",
      }}></span>
    </div>
  );
}

/* ============================================================
   PAGE: PROJECTS (/projects)
   ============================================================ */

function ProjectsPage({ navigate }) {
  return (
    <div className="page">
      <div className="container" style={{ paddingTop: "80px", paddingBottom: "60px" }}>
        <div className="eyebrow" style={{ marginBottom: "20px" }}>/projects</div>
        <h2 className="display" style={{ fontSize: "clamp(48px, 6vw, 84px)", marginBottom: "24px" }}>
          Quatre projets,<br /><span className="it">quatre raisons</span>
        </h2>
        <p style={{
          maxWidth: "560px",
          fontSize: "17px",
          color: "var(--text-mute)",
          marginBottom: "72px",
          lineHeight: 1.6,
        }}>
          Chacun avait un problème concret à résoudre. Aucun n'est un clone d'exercice. Clique pour voir le contexte, les décisions techniques, et ce que j'ai appris.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
          gap: "20px",
        }}>
          {window.PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} navigate={navigate} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* CSS-generated cosmic covers — one signature per project id. */
const COVERS = {
  orbit: `radial-gradient(circle at 30% 50%, oklch(0.06 0.012 95) 0%, oklch(0.06 0.012 95) 14%, oklch(0.87 0.18 95 / 0.55) 14.6%, oklch(0.87 0.18 95 / 0.04) 22%, transparent 35%),
          radial-gradient(ellipse 80% 60% at 70% 60%, oklch(0.30 0.09 95 / 0.5), transparent 65%),
          radial-gradient(circle at 85% 25%, oklch(0.87 0.18 95 / 0.25), transparent 35%),
          linear-gradient(135deg, oklch(0.10 0.02 95), oklch(0.06 0.015 95))`,
  nimbus: `radial-gradient(ellipse 70% 50% at 80% 30%, oklch(0.40 0.11 95 / 0.6), transparent 60%),
           radial-gradient(ellipse 60% 45% at 25% 80%, oklch(0.30 0.09 95 / 0.55), transparent 65%),
           radial-gradient(circle at 50% 50%, oklch(0.20 0.06 95 / 0.4), transparent 70%),
           linear-gradient(160deg, oklch(0.10 0.02 95), oklch(0.05 0.012 95))`,
  halcyon: `radial-gradient(circle at 50% 50%, oklch(0.87 0.18 95 / 0.0) 0%, oklch(0.87 0.18 95 / 0.18) 18%, oklch(0.87 0.18 95 / 0.0) 19%, oklch(0.87 0.18 95 / 0.12) 32%, oklch(0.87 0.18 95 / 0.0) 33%, transparent 50%),
            radial-gradient(ellipse 90% 60% at 50% 100%, oklch(0.30 0.09 95 / 0.4), transparent 60%),
            linear-gradient(180deg, oklch(0.06 0.015 95), oklch(0.10 0.02 95))`,
  ember: `radial-gradient(ellipse 90% 70% at 100% 50%, oklch(0.45 0.13 95 / 0.5), transparent 55%),
          radial-gradient(circle at 20% 30%, oklch(0.30 0.09 95 / 0.4), transparent 50%),
          radial-gradient(circle at 15% 80%, oklch(0.87 0.18 95 / 0.2), transparent 35%),
          linear-gradient(110deg, oklch(0.05 0.012 95), oklch(0.09 0.02 95))`,
};

function CoverArt({ id, label, dense = false }) {
  const bg = COVERS[id] || COVERS.orbit;
  return (
    <div style={{
      position: "absolute", inset: 0,
      background: bg,
    }}>
      {/* Twinkle dots overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(circle at 12% 28%, oklch(0.92 0.02 95) 0.5px, transparent 1.2px),
                          radial-gradient(circle at 78% 65%, oklch(0.92 0.02 95) 0.5px, transparent 1.2px),
                          radial-gradient(circle at 42% 80%, oklch(0.87 0.18 95) 0.5px, transparent 1.2px),
                          radial-gradient(circle at 65% 20%, oklch(0.92 0.02 95) 0.4px, transparent 1px),
                          radial-gradient(circle at 90% 88%, oklch(0.87 0.18 95) 0.5px, transparent 1.2px),
                          radial-gradient(circle at 30% 55%, oklch(0.92 0.02 95) 0.4px, transparent 1px),
                          radial-gradient(circle at 55% 35%, oklch(0.92 0.02 95) 0.4px, transparent 1px)`,
        backgroundSize: dense ? "180px 180px" : "240px 240px",
        opacity: 0.8,
        mixBlendMode: "screen",
      }}></div>
    </div>
  );
}

function ProjectCard({ project, index, navigate }) {
  const [hover, setHover] = useState(false);

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => navigate(`/projects/${project.id}`)}
      style={{
        background: "linear-gradient(180deg, oklch(0.13 0.025 95 / 0.6), oklch(0.10 0.02 95 / 0.4))",
        border: `1px solid ${hover ? "oklch(0.87 0.18 95 / 0.5)" : "var(--line-soft)"}`,
        borderRadius: "18px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.35s cubic-bezier(0.2, 0.7, 0.2, 1)",
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hover
          ? "0 24px 60px oklch(0 0 0 / 0.4), 0 0 30px oklch(0.87 0.18 95 / 0.15)"
          : "0 8px 24px oklch(0 0 0 / 0.25)",
        backdropFilter: "blur(8px)",
        display: "flex",
        flexDirection: "column",
      }}>

      {/* Cover */}
      <div style={{
        height: "180px",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid var(--line-soft)",
      }}>
        <CoverArt id={project.id} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, transparent 50%, oklch(0.08 0.015 95 / 0.85) 100%)",
          pointerEvents: "none",
        }}></div>
        <div style={{
          position: "absolute",
          top: "16px", left: "16px",
          display: "flex", gap: "8px",
        }}>
          <span style={{
            fontFamily: "var(--mono)",
            fontSize: "10px",
            letterSpacing: "0.12em",
            padding: "4px 10px",
            borderRadius: "999px",
            background: "oklch(0.05 0.015 95 / 0.75)",
            backdropFilter: "blur(6px)",
            color: "var(--accent)",
            border: "1px solid oklch(0.87 0.18 95 / 0.3)",
          }}>
            {project.status}
          </span>
        </div>
        <div style={{
          position: "absolute",
          bottom: "16px", right: "16px",
          fontFamily: "var(--mono)",
          fontSize: "10px",
          color: "var(--text-mute)",
        }}>
          {String(index + 1).padStart(2, "0")} / {String(window.PROJECTS.length).padStart(2, "0")}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "24px 26px 28px", display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <h3 style={{
            fontFamily: "var(--serif)",
            fontSize: "30px",
            fontWeight: 400,
            letterSpacing: "-0.01em",
          }}>{project.name}</h3>
          <span style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--text-dim)" }}>{project.year}</span>
        </div>

        <p style={{ color: "var(--text-mute)", fontSize: "15px", lineHeight: 1.55, flex: 1 }}>
          {project.tagline}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {project.stack.map(t => (
            <span key={t} style={{
              fontFamily: "var(--mono)",
              fontSize: "10.5px",
              padding: "4px 9px",
              borderRadius: "6px",
              background: "var(--surface-2)",
              color: "var(--text-mute)",
              letterSpacing: "0.02em",
            }}>{t}</span>
          ))}
        </div>

        <div style={{
          display: "flex",
          gap: "16px",
          paddingTop: "12px",
          borderTop: "1px solid var(--line-soft)",
        }}
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink href={`https://${project.github}`} label="GitHub" icon="↗" />
          {project.live && <ExternalLink href={`https://${project.live}`} label="Live" icon="↗" />}
          <span style={{
            marginLeft: "auto",
            fontFamily: "var(--mono)",
            fontSize: "11px",
            color: hover ? "var(--accent)" : "var(--text-dim)",
            transition: "color 0.25s",
          }}>
            Étude de cas {hover ? "→" : ""}
          </span>
        </div>
      </div>
    </article>
  );
}

function ExternalLink({ href, label, icon }) {
  return (
    <a href={href} target="_blank" rel="noreferrer noopener" style={{
      fontFamily: "var(--mono)",
      fontSize: "11px",
      color: "var(--text-mute)",
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: "5px",
      transition: "color 0.2s",
    }}
      onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"}
      onMouseLeave={e => e.currentTarget.style.color = "var(--text-mute)"}
    >
      {label} <span style={{ fontSize: "10px" }}>{icon}</span>
    </a>
  );
}

/* ============================================================
   PAGE: PROJECT DETAIL (/projects/:id)
   ============================================================ */

function ProjectDetailPage({ id, navigate }) {
  const project = window.PROJECTS.find(p => p.id === id);
  if (!project) {
    return (
      <div className="page">
        <div className="container" style={{ paddingTop: "120px", textAlign: "center" }}>
          <h2 className="display" style={{ fontSize: "60px" }}>Projet introuvable</h2>
          <p style={{ color: "var(--text-mute)", marginTop: "20px", marginBottom: "32px" }}>
            Cet identifiant ne correspond à rien.
          </p>
          <a href="#/projects" onClick={e => { e.preventDefault(); navigate("/projects"); }} className="btn">
            ← Retour aux projets
          </a>
        </div>
        <Footer />
      </div>
    );
  }

  const idx = window.PROJECTS.findIndex(p => p.id === id);
  const next = window.PROJECTS[(idx + 1) % window.PROJECTS.length];

  return (
    <div className="page">
      {/* Cover */}
      <div style={{
        height: "420px",
        position: "relative",
        borderBottom: "1px solid var(--line-soft)",
        overflow: "hidden",
      }}>
        <CoverArt id={project.id} dense />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, oklch(0.05 0.015 95 / 0.45) 0%, oklch(0.05 0.015 95 / 0.78) 70%, var(--bg-deep) 100%)",
          pointerEvents: "none",
        }}></div>
        <div className="container" style={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          paddingBottom: "40px",
        }}>
          <button
            onClick={() => navigate("/projects")}
            style={{
              alignSelf: "flex-start",
              fontFamily: "var(--mono)",
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text-mute)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              marginBottom: "32px",
              padding: "4px 0",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text-mute)"}
          >
            ← Retour aux projets
          </button>

          <div className="eyebrow" style={{ marginBottom: "16px" }}>
            {project.year} · {project.status}
          </div>
          <h1 className="display" style={{ fontSize: "clamp(60px, 9vw, 130px)" }}>
            {project.name}
          </h1>
          <p style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: "clamp(22px, 2.4vw, 30px)",
            color: "var(--accent)",
            marginTop: "12px",
            maxWidth: "720px",
          }}>
            {project.tagline}
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "64px", paddingBottom: "60px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 280px",
          gap: "72px",
          alignItems: "start",
        }}>
          {/* Main */}
          <main style={{ display: "flex", flexDirection: "column", gap: "56px" }}>
            <Section title="Contexte">
              <p style={proseStyle}>{project.context}</p>
            </Section>

            <Section title="Défis & solutions">
              <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                {project.challenges.map((c, i) => (
                  <div key={i} style={{
                    borderLeft: "1px solid var(--line)",
                    paddingLeft: "24px",
                    position: "relative",
                  }}>
                    <span style={{
                      position: "absolute",
                      left: "-5px",
                      top: "8px",
                      width: "9px", height: "9px",
                      borderRadius: "50%",
                      background: "var(--accent)",
                      boxShadow: "0 0 12px var(--accent-glow)",
                    }}></span>
                    <h4 style={{
                      fontFamily: "var(--serif)",
                      fontSize: "26px",
                      fontWeight: 400,
                      marginBottom: "12px",
                      letterSpacing: "-0.01em",
                    }}>{c.title}</h4>
                    <p style={proseStyle}>{c.body}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Décisions techniques">
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "14px" }}>
                {project.decisions.map((d, i) => (
                  <li key={i} style={{
                    ...proseStyle,
                    paddingLeft: "24px",
                    position: "relative",
                  }}>
                    <span style={{
                      position: "absolute",
                      left: "0",
                      top: "11px",
                      color: "var(--accent)",
                      fontFamily: "var(--mono)",
                      fontSize: "10px",
                    }}>0{i + 1}</span>
                    {d}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Captures">
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "12px",
              }}>
                {[0, 1, 2, 3].map(n => <Screenshot key={n} index={n} />)}
              </div>
            </Section>
          </main>

          {/* Sidebar */}
          <aside style={{
            position: "sticky",
            top: "100px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            fontFamily: "var(--mono)",
            fontSize: "12px",
          }}>
            <MetricCard metric={project.metric} />

            <InfoBlock label="Stack">
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {project.stack.map(t => (
                  <span key={t} style={{
                    padding: "4px 9px",
                    borderRadius: "6px",
                    background: "var(--surface-2)",
                    color: "var(--text)",
                  }}>{t}</span>
                ))}
              </div>
            </InfoBlock>

            <InfoBlock label="Liens">
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <a href={`https://${project.github}`} target="_blank" rel="noreferrer" style={sidebarLink}>
                  <span style={{ color: "var(--accent)" }}>→</span> {project.github}
                </a>
                {project.live && (
                  <a href={`https://${project.live}`} target="_blank" rel="noreferrer" style={sidebarLink}>
                    <span style={{ color: "var(--accent)" }}>→</span> {project.live}
                  </a>
                )}
              </div>
            </InfoBlock>

            <InfoBlock label="Année">
              <span style={{ color: "var(--text)" }}>{project.year}</span>
            </InfoBlock>
          </aside>
        </div>

        {/* Next project */}
        <div style={{
          marginTop: "120px",
          paddingTop: "40px",
          borderTop: "1px solid var(--line-soft)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: "10px" }}>Projet suivant</div>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: "44px", fontWeight: 400 }}>
              {next.name} <span style={{ color: "var(--text-dim)", fontSize: "20px" }}>· {next.tagline}</span>
            </h3>
          </div>
          <button onClick={() => navigate(`/projects/${next.id}`)} className="btn btn-primary">
            Lire <span className="arrow">→</span>
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

const proseStyle = {
  fontSize: "16.5px",
  lineHeight: 1.7,
  color: "var(--text-mute)",
  letterSpacing: "0.005em",
};

const sidebarLink = {
  color: "var(--text-mute)",
  textDecoration: "none",
  fontSize: "12px",
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  transition: "color 0.2s",
};

function Section({ title, children }) {
  return (
    <section>
      <div style={{
        fontFamily: "var(--mono)",
        fontSize: "11px",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "var(--text-dim)",
        marginBottom: "20px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}>
        <span>{title}</span>
        <span style={{ flex: 1, height: "1px", background: "var(--line-soft)" }}></span>
      </div>
      {children}
    </section>
  );
}

function MetricCard({ metric }) {
  return (
    <div style={{
      padding: "20px 22px",
      borderRadius: "14px",
      background: "linear-gradient(180deg, oklch(0.87 0.18 95 / 0.08), oklch(0.87 0.18 95 / 0.02))",
      border: "1px solid oklch(0.87 0.18 95 / 0.25)",
    }}>
      <div style={{
        fontFamily: "var(--serif)",
        fontSize: "44px",
        color: "var(--accent)",
        lineHeight: 1,
        textShadow: "0 0 24px oklch(0.87 0.18 95 / 0.4)",
      }}>{metric.value}</div>
      <div style={{
        fontFamily: "var(--mono)",
        fontSize: "11px",
        marginTop: "8px",
        color: "var(--text-mute)",
        letterSpacing: "0.04em",
      }}>{metric.label}</div>
    </div>
  );
}

function InfoBlock({ label, children }) {
  return (
    <div>
      <div style={{
        fontSize: "10px",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "var(--text-dim)",
        marginBottom: "10px",
      }}>{label}</div>
      {children}
    </div>
  );
}

function Screenshot({ index }) {
  return (
    <div style={{
      aspectRatio: "16 / 10",
      borderRadius: "10px",
      background: `repeating-linear-gradient(45deg, oklch(0.14 0.025 95), oklch(0.14 0.025 95) 6px, oklch(0.16 0.03 95) 6px, oklch(0.16 0.03 95) 12px)`,
      border: "1px dashed var(--line)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--mono)",
      fontSize: "10.5px",
      color: "var(--text-dim)",
      letterSpacing: "0.06em",
    }}>
      [ screenshot_{String(index + 1).padStart(2, "0")}.png ]
    </div>
  );
}

/* ============================================================
   PAGE: ABOUT (/about)
   ============================================================ */

function AboutPage({ navigate }) {
  return (
    <div className="page">
      <div className="container" style={{ paddingTop: "80px", paddingBottom: "60px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr",
          gap: "80px",
          alignItems: "start",
        }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: "20px" }}>/about</div>
            <h2 className="display" style={{ fontSize: "clamp(48px, 6vw, 84px)", marginBottom: "40px" }}>
              Le code,<br />
              <span className="it">la deuxième fois</span>
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "22px", maxWidth: "560px" }}>
              <p style={{ ...proseStyle, fontSize: "18px" }}>
                J'ai commencé par les sciences cognitives, pas par le code. Pendant trois ans j'ai géré des projets web depuis l'extérieur — assez près du métier pour voir où ça grince, trop loin pour pouvoir le réparer moi-même.
              </p>
              <p style={{ ...proseStyle, fontSize: "18px" }}>
                En 2024 j'ai bifurqué : bootcamp Rails, puis freelance. Aujourd'hui je construis des outils pour des PME, des associations, et des projets perso qui partent souvent d'une frustration personnelle.
              </p>
              <p style={{ ...proseStyle, fontSize: "18px" }}>
                <span style={{ color: "var(--accent)", fontStyle: "italic", fontFamily: "var(--serif)", fontSize: "22px" }}>Pourquoi Rails ?</span> Parce que la productivité est réelle et que la communauté tient à ce que ça reste lisible. DHH a tort sur beaucoup de choses, mais sur le fait qu'un développeur seul devrait pouvoir construire des choses sérieuses, il a raison.
              </p>
              <p style={{ ...proseStyle, fontSize: "18px" }}>
                Je cherche aujourd'hui un poste en CDI ou un partenariat long-terme sur un produit. Stack Rails de préférence, équipe modeste, code review sérieuse, pas de bullshit. À distance ou Paris.
              </p>
            </div>

            <div style={{ marginTop: "48px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a href="#/contact" onClick={e => { e.preventDefault(); navigate("/contact"); }} className="btn btn-primary">
                On en parle <span className="arrow">→</span>
              </a>
              <a href={`https://${window.PROFILE.github}`} target="_blank" rel="noreferrer" className="btn">
                GitHub ↗
              </a>
              <a href={`https://${window.PROFILE.linkedin}`} target="_blank" rel="noreferrer" className="btn">
                LinkedIn ↗
              </a>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <div style={{
              fontFamily: "var(--mono)",
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--text-dim)",
              marginBottom: "28px",
            }}>
              ↳ Parcours
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              {window.TIMELINE.map((t, i) => (
                <div key={i} style={{
                  display: "grid",
                  gridTemplateColumns: "90px 1fr",
                  gap: "20px",
                  paddingBottom: "28px",
                  borderBottom: i < window.TIMELINE.length - 1 ? "1px solid var(--line-soft)" : "none",
                }}>
                  <div style={{
                    fontFamily: "var(--mono)",
                    fontSize: "12px",
                    color: "var(--accent)",
                    letterSpacing: "0.04em",
                    paddingTop: "2px",
                  }}>{t.year}</div>
                  <div>
                    <h4 style={{
                      fontFamily: "var(--serif)",
                      fontSize: "22px",
                      fontWeight: 400,
                      marginBottom: "8px",
                      letterSpacing: "-0.01em",
                    }}>{t.title}</h4>
                    <p style={{
                      fontSize: "14px",
                      lineHeight: 1.6,
                      color: "var(--text-mute)",
                    }}>{t.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* ============================================================
   PAGE: CONTACT (/contact)
   ============================================================ */

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Ton nom, même un prénom suffit.";
    if (!form.email.trim()) e.email = "J'ai besoin d'une adresse pour te répondre.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Cette adresse n'a pas l'air valide.";
    if (!form.message.trim()) e.message = "Un mot, une phrase, ce que tu veux.";
    else if (form.message.trim().length < 10) e.message = "Un peu plus, juste pour que je puisse répondre utilement.";
    return e;
  }

  function submit(e) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
    }, 1100);
  }

  function update(k, v) {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: undefined }));
  }

  return (
    <div className="page">
      <div className="container" style={{ paddingTop: "80px", paddingBottom: "60px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "start",
        }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: "20px" }}>/contact</div>
            <h2 className="display" style={{ fontSize: "clamp(48px, 6vw, 84px)", marginBottom: "32px" }}>
              Dis-moi <span className="it">tout</span>.
            </h2>
            <p style={{ ...proseStyle, fontSize: "17px", maxWidth: "440px", marginBottom: "44px" }}>
              Offre d'emploi, mission ponctuelle, projet d'asso, ou juste une question sur un de mes projets — j'essaie de répondre dans les 48h.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <ContactRow label="Email" value={window.PROFILE.email} href={`mailto:${window.PROFILE.email}`} />
              <ContactRow label="GitHub" value={window.PROFILE.github} href={`https://${window.PROFILE.github}`} />
              <ContactRow label="LinkedIn" value={window.PROFILE.linkedin} href={`https://${window.PROFILE.linkedin}`} />
              <ContactRow label="Localisation" value={window.PROFILE.location} />
            </div>

            <div style={{
              marginTop: "48px",
              padding: "18px 20px",
              borderRadius: "12px",
              border: "1px dashed var(--line-soft)",
              fontFamily: "var(--mono)",
              fontSize: "11px",
              color: "var(--text-dim)",
              lineHeight: 1.6,
            }}>
              ↳ Le formulaire utilise Action Mailer côté Rails,<br />
              &nbsp;&nbsp;&nbsp;envoi via Resend en production.<br />
              &nbsp;&nbsp;&nbsp;Pas de tracking, pas de cookie.
            </div>
          </div>

          <form onSubmit={submit} style={{
            background: "linear-gradient(180deg, oklch(0.13 0.025 95 / 0.65), oklch(0.10 0.02 95 / 0.45))",
            border: "1px solid var(--line-soft)",
            borderRadius: "18px",
            padding: "36px",
            backdropFilter: "blur(10px)",
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            position: "relative",
            overflow: "hidden",
          }}>
            {status === "sent" && (
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, oklch(0.13 0.025 95 / 0.96), oklch(0.10 0.02 95 / 0.96))",
                backdropFilter: "blur(20px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                padding: "40px",
                textAlign: "center",
                zIndex: 5,
                animation: "pageIn 0.5s ease",
              }}>
                <div style={{
                  width: "64px", height: "64px",
                  borderRadius: "50%",
                  background: "oklch(0.87 0.18 95 / 0.15)",
                  border: "1px solid oklch(0.87 0.18 95 / 0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "28px",
                  color: "var(--accent)",
                  boxShadow: "0 0 40px oklch(0.87 0.18 95 / 0.35)",
                }}>✓</div>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: "36px", fontWeight: 400 }}>
                  <span style={{ fontStyle: "italic", color: "var(--accent)" }}>Reçu.</span>
                </h3>
                <p style={{ color: "var(--text-mute)", maxWidth: "320px" }}>
                  Je te réponds dans la journée si je peux, sinon dans les 48h. Merci.
                </p>
                <button type="button" onClick={() => { setForm({ name: "", email: "", message: "" }); setStatus("idle"); }} className="btn" style={{ marginTop: "8px" }}>
                  Envoyer un autre message
                </button>
              </div>
            )}

            <Field
              label="Nom"
              id="name"
              value={form.name}
              onChange={v => update("name", v)}
              error={errors.name}
              placeholder="Comment dois-je t'appeler ?"
            />
            <Field
              label="Email"
              id="email"
              type="email"
              value={form.email}
              onChange={v => update("email", v)}
              error={errors.email}
              placeholder="ton@email.com"
            />
            <Field
              label="Message"
              id="message"
              textarea
              value={form.message}
              onChange={v => update("message", v)}
              error={errors.message}
              placeholder="Une mission, un poste, une question — j'écoute."
            />

            <button type="submit" disabled={status === "sending"} className="btn btn-primary" style={{
              justifyContent: "center",
              padding: "16px 24px",
              opacity: status === "sending" ? 0.7 : 1,
            }}>
              {status === "sending" ? "Envoi en cours…" : <>Envoyer <span className="arrow">→</span></>}
            </button>

            <p style={{
              fontFamily: "var(--mono)",
              fontSize: "10.5px",
              color: "var(--text-dim)",
              textAlign: "center",
              letterSpacing: "0.04em",
            }}>
              POST /messages → Action Mailer → Resend
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Field({ label, id, value, onChange, error, placeholder, type = "text", textarea }) {
  const [focused, setFocused] = useState(false);
  const base = {
    width: "100%",
    background: "oklch(0.05 0.015 95 / 0.6)",
    border: `1px solid ${error ? "oklch(0.7 0.18 25)" : focused ? "var(--accent)" : "var(--line)"}`,
    borderRadius: "10px",
    padding: textarea ? "14px 16px" : "12px 16px",
    color: "var(--text)",
    fontFamily: "var(--sans)",
    fontSize: "15px",
    outline: "none",
    resize: textarea ? "vertical" : "none",
    minHeight: textarea ? "140px" : "auto",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxShadow: focused ? "0 0 0 4px oklch(0.87 0.18 95 / 0.12)" : "none",
  };

  return (
    <div>
      <label htmlFor={id} style={{
        display: "block",
        fontFamily: "var(--mono)",
        fontSize: "11px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: error ? "oklch(0.75 0.18 25)" : "var(--text-mute)",
        marginBottom: "8px",
      }}>
        {label}{error && <span style={{ textTransform: "none", letterSpacing: 0, fontStyle: "italic" }}> — {error}</span>}
      </label>
      {textarea ? (
        <textarea
          id={id}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={base}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={base}
        />
      )}
    </div>
  );
}

function ContactRow({ label, value, href }) {
  const content = (
    <div style={{
      display: "grid",
      gridTemplateColumns: "120px 1fr",
      gap: "20px",
      padding: "14px 0",
      borderBottom: "1px solid var(--line-soft)",
      alignItems: "center",
    }}>
      <span style={{
        fontFamily: "var(--mono)",
        fontSize: "11px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--text-dim)",
      }}>{label}</span>
      <span style={{
        fontFamily: "var(--mono)",
        fontSize: "13px",
        color: href ? "var(--text)" : "var(--text-mute)",
        transition: "color 0.2s",
      }}>{value}</span>
    </div>
  );
  if (!href) return content;
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
      onMouseEnter={e => { const sp = e.currentTarget.querySelectorAll("span")[1]; if (sp) sp.style.color = "var(--accent)"; }}
      onMouseLeave={e => { const sp = e.currentTarget.querySelectorAll("span")[1]; if (sp) sp.style.color = "var(--text)"; }}
    >
      {content}
    </a>
  );
}

Object.assign(window, {
  HomePage, ProjectsPage, ProjectDetailPage, AboutPage, ContactPage, Footer,
});
