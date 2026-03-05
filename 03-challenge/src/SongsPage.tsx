// src/SongsPage.tsx
import { useState, useRef, useEffect } from "react";
import { createSongPlaylist, SongLinkedList, type Song } from "./SongLinkedList";

const playlist: SongLinkedList = createSongPlaylist();

export default function SongsPage() {
  const [currentSong, setCurrentSong] = useState<Song>(
    playlist.getCurrent()!.song
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [canNext, setCanNext] = useState(playlist.hasNext());
  const [canPrev, setCanPrev] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const allSongs = playlist.toArray();

  useEffect(() => {
    playlist.reset();
    setCurrentSong(playlist.getCurrent()!.song);
    setCanNext(playlist.hasNext());
    setCanPrev(false);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.src = currentSong.audioUrl;
    audio.load();
    if (isPlaying) audio.play().catch(() => setIsPlaying(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => setIsPlaying(false));
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (!playlist.hasNext()) return;
    playlist.nextSong();
    const node = playlist.getCurrent()!;
    setCurrentSong(node.song);
    setCanNext(playlist.hasNext());
    setCanPrev(true);
    setProgress(0);
  };

  const handleReset = () => {
    playlist.reset();
    const node = playlist.getCurrent()!;
    setCurrentSong(node.song);
    setCanNext(playlist.hasNext());
    setCanPrev(false);
    setIsPlaying(false);
    setProgress(0);
    audioRef.current?.pause();
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setProgress(audio.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setProgress(val);
    if (audioRef.current) audioRef.current.currentTime = val;
  };

  const fmt = (s: number) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const idx = allSongs.findIndex((s) => s.id === currentSong.id);

  return (
    <div style={styles.page}>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => { setIsPlaying(false); setProgress(0); }}
      />

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerTag}>LISTA ENLAZADA</div>
        <h1 style={styles.headerTitle}>REPRODUCTOR</h1>
        <p style={styles.headerSub}>Navegando nodo → nodo en orden</p>
      </div>

      {/* Main card */}
      <div style={styles.card}>
        {/* Vinyl art */}
        <div style={{ ...styles.vinyl, animation: isPlaying ? "spin 4s linear infinite" : "none" }}>
          <div style={styles.vinylInner}>
            <div style={styles.vinylCenter} />
          </div>
        </div>

        {/* Song info */}
        <div style={styles.songInfo}>
          <span style={styles.trackNum}>TRACK {idx + 1} / {allSongs.length}</span>
          <h2 style={styles.songTitle}>{currentSong.title}</h2>
          <p style={styles.songArtist}>{currentSong.artist}</p>
          <p style={styles.songAlbum}>{currentSong.album} · {currentSong.year}</p>
        </div>

        {/* Progress */}
        <div style={styles.progressWrap}>
          <span style={styles.timeLabel}>{fmt(progress)}</span>
          <input
            type="range"
            min={0}
            max={duration || 1}
            value={progress}
            onChange={handleSeek}
            style={styles.slider}
          />
          <span style={styles.timeLabel}>{fmt(duration)}</span>
        </div>

        {/* Controls */}
        <div style={styles.controls}>
          <button onClick={handleReset} style={styles.btnSecondary} title="Reiniciar">
            ↺
          </button>
          <button onClick={handlePlayPause} style={styles.btnPlay}>
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button
            onClick={handleNext}
            disabled={!canNext}
            style={{ ...styles.btnSecondary, opacity: canNext ? 1 : 0.3 }}
            title="Siguiente"
          >
            ⏭
          </button>
        </div>

        <p style={styles.hint}>
          {canNext
            ? `Siguiente → ${allSongs[idx + 1]?.title}`
            : "Último nodo de la lista"}
        </p>
      </div>

      {/* List visualization */}
      <div style={styles.listSection}>
        <p style={styles.listTitle}>ESTRUCTURA DE LA LISTA</p>
        <div style={styles.listRow}>
          {allSongs.map((s, i) => (
            <div key={s.id} style={styles.listItem}>
              <div style={{
                ...styles.listNode,
                background: s.id === currentSong.id ? "#e8ff47" : "#1a1a1a",
                color: s.id === currentSong.id ? "#000" : "#888",
                border: s.id === currentSong.id ? "2px solid #e8ff47" : "2px solid #333",
              }}>
                <span style={{ fontSize: 10, fontFamily: "monospace" }}>node_{i + 1}</span>
                <span style={{ fontSize: 12, fontWeight: 700 }}>{s.title.split(" ")[0]}</span>
              </div>
              {i < allSongs.length - 1 && (
                <div style={styles.arrow}>→</div>
              )}
              {i === allSongs.length - 1 && (
                <div style={{ ...styles.arrow, color: "#ff4747" }}>NULL</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input[type=range] { -webkit-appearance: none; height: 4px; border-radius: 2px; background: #333; outline: none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 14px; height: 14px; border-radius: 50%; background: #e8ff47; cursor: pointer; }
      `}</style>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#0a0a0a",
    color: "#fff",
    fontFamily: "'Courier New', monospace",
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 32,
  },
  header: {
    textAlign: "center",
  },
  headerTag: {
    display: "inline-block",
    background: "#e8ff47",
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
    fontFamily: "'Courier New', monospace",
  },
  headerSub: {
    color: "#555",
    fontSize: 13,
    margin: "8px 0 0",
    letterSpacing: 2,
  },
  card: {
    background: "#111",
    border: "1px solid #222",
    borderRadius: 16,
    padding: 40,
    width: "100%",
    maxWidth: 480,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
  },
  vinyl: {
    width: 160,
    height: 160,
    borderRadius: "50%",
    background: "radial-gradient(circle, #1a1a1a 30%, #111 31%, #2a2a2a 50%, #111 51%, #222 70%, #0a0a0a 71%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 40px rgba(232,255,71,0.15)",
  },
  vinylInner: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    background: "#e8ff47",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  vinylCenter: {
    width: 12,
    height: 12,
    borderRadius: "50%",
    background: "#111",
  },
  songInfo: {
    textAlign: "center",
  },
  trackNum: {
    fontSize: 10,
    color: "#e8ff47",
    letterSpacing: 3,
    fontWeight: 700,
  },
  songTitle: {
    fontSize: 28,
    fontWeight: 900,
    margin: "8px 0 4px",
    letterSpacing: -1,
  },
  songArtist: {
    color: "#e8ff47",
    fontSize: 14,
    margin: "0 0 4px",
    fontWeight: 700,
    letterSpacing: 2,
  },
  songAlbum: {
    color: "#555",
    fontSize: 12,
    margin: 0,
  },
  progressWrap: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  slider: {
    flex: 1,
    accentColor: "#e8ff47",
  },
  timeLabel: {
    fontSize: 11,
    color: "#555",
    fontFamily: "monospace",
    minWidth: 34,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  btnPlay: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    background: "#e8ff47",
    color: "#000",
    border: "none",
    fontSize: 22,
    cursor: "pointer",
    fontWeight: 900,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btnSecondary: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "#1a1a1a",
    color: "#e8ff47",
    border: "1px solid #333",
    fontSize: 18,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  hint: {
    fontSize: 11,
    color: "#444",
    margin: 0,
    letterSpacing: 1,
    textAlign: "center",
  },
  listSection: {
    width: "100%",
    maxWidth: 700,
  },
  listTitle: {
    fontSize: 10,
    color: "#555",
    letterSpacing: 3,
    fontWeight: 700,
    marginBottom: 16,
    textAlign: "center",
  },
  listRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 4,
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  listNode: {
    padding: "8px 12px",
    borderRadius: 6,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    minWidth: 70,
    transition: "all 0.3s",
  },
  arrow: {
    color: "#333",
    fontSize: 16,
    fontWeight: 700,
  },
};
