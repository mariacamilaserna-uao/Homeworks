import '../styles/Loading.css';

export function Loading() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Cargando contactos...</p>
    </div>
  );
}
