import { useNavigate } from 'react-router-dom'

export function ErrorPage() {
  const navigate = useNavigate()

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      fontFamily: 'sans-serif',
    }}>
      <h1 style={{ fontSize: '48px', color: '#333', margin: '0 0 20px 0' }}>
        404
      </h1>
      <p style={{ fontSize: '18px', color: '#666', margin: '0 0 30px 0' }}>
        Pagina no encontrada
      </p>
      <button
        onClick={() => navigate('/home')}
        style={{
          padding: '12px 24px',
          background: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: '600',
        }}
      >
        Volver al inicio
      </button>
    </div>
  )
}
