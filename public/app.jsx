/* Main app + hash router */

const { useState, useEffect } = React;

function parseHash() {
  const h = window.location.hash.replace(/^#/, "") || "/";
  // Match /projects/:id
  const projMatch = h.match(/^\/projects\/([\w-]+)\/?$/);
  if (projMatch) return { route: "/projects/:id", id: projMatch[1] };
  return { route: h.replace(/\/$/, "") || "/" };
}

function Nav({ route, navigate }) {
  const links = [
    { path: "/", label: "accueil" },
    { path: "/projects", label: "projets" },
    { path: "/about", label: "à propos" },
    { path: "/contact", label: "contact" },
  ];

  const isActive = (p) => {
    if (p === "/") return route === "/";
    return route.startsWith(p);
  };

  return (
    <nav className="nav" data-screen-label="Nav">
      <a href="#/" onClick={e => { e.preventDefault(); navigate("/"); }} className="nav-brand">
        <span className="dot"></span>
        <span>{window.PROFILE.name.split(" ").map(n => n[0]).join("")} — Portfolio</span>
      </a>
      <div className="nav-links">
        {links.map(l => (
          <a
            key={l.path}
            href={`#${l.path}`}
            onClick={(e) => { e.preventDefault(); navigate(l.path); }}
            className={`nav-link ${isActive(l.path) ? "active" : ""}`}
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function App() {
  const [parsed, setParsed] = useState(parseHash());

  useEffect(() => {
    function onHash() {
      setParsed(parseHash());
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  function navigate(path) {
    if (window.location.hash === `#${path}`) return;
    window.location.hash = path;
  }

  const { route, id } = parsed;

  let label = "Home";
  let page = null;
  if (route === "/") {
    label = "01 Home";
    page = <window.HomePage navigate={navigate} />;
  } else if (route === "/projects") {
    label = "02 Projects";
    page = <window.ProjectsPage navigate={navigate} />;
  } else if (route === "/projects/:id") {
    label = `02b Project · ${id}`;
    page = <window.ProjectDetailPage id={id} navigate={navigate} />;
  } else if (route === "/about") {
    label = "03 About";
    page = <window.AboutPage navigate={navigate} />;
  } else if (route === "/contact") {
    label = "04 Contact";
    page = <window.ContactPage navigate={navigate} />;
  } else {
    label = "404";
    page = (
      <div className="page">
        <div className="container" style={{ paddingTop: "120px", textAlign: "center" }}>
          <h2 className="display" style={{ fontSize: "80px" }}>
            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>404</span>
          </h2>
          <p style={{ color: "var(--text-mute)", marginTop: "20px", marginBottom: "32px" }}>
            Cette page n'existe pas (ou plus).
          </p>
          <a href="#/" onClick={e => { e.preventDefault(); navigate("/"); }} className="btn btn-primary">
            ← Retour à l'accueil
          </a>
        </div>
        <window.Footer />
      </div>
    );
  }

  // Use key on page wrapper to retrigger entry animation per route
  const pageKey = route === "/projects/:id" ? `proj-${id}` : route;

  return (
    <div className="app" data-screen-label={label}>
      <Nav route={route} navigate={navigate} />
      <div key={pageKey} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {page}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
