// src/BrowserPage.tsx
import { useState } from "react";
import { createBrowserHistory, BrowserDoublyLinkedList, type BrowserPage as Page } from "./BrowserDoublyLinkedList";

const history: BrowserDoublyLinkedList = createBrowserHistory();

export default function BrowserHistoryPage() {
  const [currentPage, setCurrentPage] = useState<Page>(history.getCurrent()!.page);
  const [canFwd, setCanFwd] = useState(history.canGoForward());
  const [canBck, setCanBck] = useState(history.canGoBack());
  const allPages = history.toArray();

  const refresh = () => {
    const node = history.getCurrent();
    if (!node) return;
    setCurrentPage(node.page);
    setCanFwd(history.canGoForward());
    setCanBck(history.canGoBack());
  };

  const handleBack = () => {
    history.goBack();
    refresh();
  };

  const handleForward = () => {
    history.goForward();
    refresh();
  };

  const handleGoTo = (id: number) => {
    history.goToHead();
    const pages = history.toArray();
    const target = pages.findIndex((p) => p.id === id);
    for (let i = 0; i < target; i++) history.goForward();
    refresh();
  };

  const idx = allPages.findIndex((p) => p.id === currentPage.id);

  return (
    <div style={styles.page}>
      {/* Header */}

      <div style={styles.header}>
        <div style={styles.headerTag}>LISTA DOBLEMENTE ENLAZADA</div>
        <h1 style={styles.headerTitle}>HISTORIAL</h1>
        <p style={styles.headerSub}>prev ← nodo → next · navegación bidireccional</p>
      </div>

      {/* Browser mockup */}
      <div style={styles.browser}>
        {/* Browser chrome */}
        <div style={styles.browserChrome}>
          <div style={styles.browserDots}>
            <div style={{ ...styles.dot, background: "#ff5f57" }} />
            <div style={{ ...styles.dot, background: "#febc2e" }} />
            <div style={{ ...styles.dot, background: "#28c840" }} />
          </div>
          <div style={styles.navButtons}>
            <button
              onClick={handleBack}
              disabled={!canBck}
              style={{ ...styles.navBtn, opacity: canBck ? 1 : 0.3 }}
              title="Atrás"
            >
              ←
            </button>
            <button
              onClick={handleForward}
              disabled={!canFwd}
              style={{ ...styles.navBtn, opacity: canFwd ? 1 : 0.3 }}
              title="Adelante"
            >
              →
            </button>
          </div>
          <div style={styles.urlBar}>
            <span style={styles.favicon}>{currentPage.favicon}</span>
            <span style={styles.urlText}>{currentPage.url}</span>
          </div>
          <span style={styles.timeStamp}>{currentPage.visitedAt}</span>
        </div>

        {/* Browser content */}
        <div style={styles.browserContent}>
          <div style={styles.pagePreview}>
            <div style={styles.previewFavicon}>{currentPage.favicon}</div>
            <h2 style={styles.previewTitle}>{currentPage.title}</h2>
            <p style={styles.previewUrl}>{currentPage.url}</p>
            <p style={styles.previewVisit}>Visitado a las {currentPage.visitedAt}</p>
          </div>
        </div>
      </div>

      {/* Node info */}
      <div style={styles.nodeInfo}>
        <div style={styles.nodeCard}>
          <span style={styles.nodeLabel}>PREV</span>
          <span style={styles.nodeVal}>
            {idx > 0 ? allPages[idx - 1].favicon + " " + allPages[idx - 1].title : "NULL"}
          </span>
        </div>
        <div style={{ ...styles.nodeCard, background: "#4fc3f7", color: "#000" }}>
          <span style={{ ...styles.nodeLabel, color: "#000" }}>CURRENT</span>
          <span style={{ ...styles.nodeVal, color: "#000" }}>
            {currentPage.favicon} {currentPage.title}
          </span>
        </div>
        <div style={styles.nodeCard}>
          <span style={styles.nodeLabel}>NEXT</span>
          <span style={styles.nodeVal}>
            {idx < allPages.length - 1 ? allPages[idx + 1].favicon + " " + allPages[idx + 1].title : "NULL"}
          </span>
        </div>
      </div>

      {/* History list visualization */}
      <div style={styles.listSection}>
        <p style={styles.listTitle}>HISTORIAL COMPLETO — HAZ CLIC PARA NAVEGAR</p>
        <div style={styles.listWrap}>
          {allPages.map((p, i) => (
            <div key={p.id} style={styles.listItem}>
              {i > 0 && <div style={styles.connector}>⇄</div>}
              <button
                onClick={() => handleGoTo(p.id)}
                style={{
                  ...styles.histNode,
                  background: p.id === currentPage.id ? "#4fc3f7" : "#111",
                  color: p.id === currentPage.id ? "#000" : "#aaa",
                  border: p.id === currentPage.id ? "2px solid #4fc3f7" : "2px solid #222",
                  transform: p.id === currentPage.id ? "scale(1.05)" : "scale(1)",
                }}
              >
                <span style={{ fontSize: 18 }}>{p.favicon}</span>
                <span style={{ fontSize: 11, fontWeight: 700 }}>{p.title.split(" ")[0].replace("-", "")}</span>
                <span style={{ fontSize: 9, opacity: 0.6 }}>{p.visitedAt}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div style={styles.controls}>
        <button onClick={handleBack} disabled={!canBck} style={{ ...styles.ctrlBtn, opacity: canBck ? 1 : 0.3 }}>
          ← ATRÁS
        </button>
        <div style={styles.pageCounter}>
          {idx + 1} / {allPages.length}
        </div>
        <button onClick={handleForward} disabled={!canFwd} style={{ ...styles.ctrlBtn, opacity: canFwd ? 1 : 0.3 }}>
          ADELANTE →
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#050a14",
    color: "#fff",
    fontFamily: "'Courier New', monospace",
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 32,
  },
  header: { textAlign: "center" },
  headerTag: {
    display: "inline-block",
    background: "#4fc3f7",
    color: "#000",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 3,
    padding: "4px 12px",
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: "clamp(36px, 8vw, 72px)",
    fontWeight: 900,
    margin: 0,
    letterSpacing: -2,
  },
  headerSub: { color: "#334", fontSize: 13, margin: "8px 0 0", letterSpacing: 2 },
  browser: {
    width: "100%",
    maxWidth: 620,
    background: "#0d1117",
    borderRadius: 12,
    overflow: "hidden",
    border: "1px solid #1e2a3a",
    boxShadow: "0 0 60px rgba(79,195,247,0.08)",
  },
  browserChrome: {
    background: "#161b22",
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    gap: 12,
    borderBottom: "1px solid #1e2a3a",
  },
  browserDots: { display: "flex", gap: 6 },
  dot: { width: 12, height: 12, borderRadius: "50%" },
  navButtons: { display: "flex", gap: 4 },
  navBtn: {
    background: "#0d1117",
    border: "1px solid #1e2a3a",
    color: "#4fc3f7",
    width: 28,
    height: 28,
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  urlBar: {
    flex: 1,
    background: "#0d1117",
    border: "1px solid #1e2a3a",
    borderRadius: 6,
    padding: "6px 12px",
    display: "flex",
    alignItems: "center",
    gap: 8,
    overflow: "hidden",
  },
  favicon: { fontSize: 14 },
  urlText: { fontSize: 12, color: "#4fc3f7", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  timeStamp: { fontSize: 10, color: "#334", whiteSpace: "nowrap" },
  browserContent: {
    padding: 40,
    minHeight: 180,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  pagePreview: { textAlign: "center" },
  previewFavicon: { fontSize: 48, marginBottom: 16 },
  previewTitle: { fontSize: 24, fontWeight: 900, margin: "0 0 8px", letterSpacing: -1 },
  previewUrl: { color: "#4fc3f7", fontSize: 12, margin: "0 0 8px" },
  previewVisit: { color: "#334", fontSize: 11 },
  nodeInfo: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    maxWidth: 620,
  },
  nodeCard: {
    flex: 1,
    minWidth: 140,
    background: "#0d1117",
    border: "1px solid #1e2a3a",
    borderRadius: 8,
    padding: "12px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  nodeLabel: { fontSize: 9, color: "#4fc3f7", letterSpacing: 3, fontWeight: 700 },
  nodeVal: { fontSize: 12, color: "#aaa" },
  listSection: { width: "100%", maxWidth: 700 },
  listTitle: { fontSize: 10, color: "#334", letterSpacing: 3, fontWeight: 700, marginBottom: 16, textAlign: "center" },
  listWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 4,
  },
  listItem: { display: "flex", alignItems: "center", gap: 4 },
  connector: { color: "#1e2a3a", fontSize: 16 },
  histNode: {
    padding: "10px 14px",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    cursor: "pointer",
    transition: "all 0.2s",
    minWidth: 72,
    fontFamily: "'Courier New', monospace",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    gap: 24,
  },
  ctrlBtn: {
    background: "#0d1117",
    border: "1px solid #4fc3f7",
    color: "#4fc3f7",
    padding: "12px 24px",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 2,
    fontFamily: "'Courier New', monospace",
  },
  pageCounter: {
    fontSize: 20,
    fontWeight: 900,
    color: "#4fc3f7",
    minWidth: 60,
    textAlign: "center",
  },
};
