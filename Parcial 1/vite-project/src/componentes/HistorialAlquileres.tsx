import type { Alquiler } from '../types';

interface Props {
  alquileres: Alquiler[];
}

export function HistorialAlquileres({ alquileres }: Props) {
  return (
    <div className="seccion">
      <h3>Historial de Alquileres ({alquileres.length})</h3>
      <div className="historial">
        {alquileres.length === 0 ? (
          <p className="vacio">Sin alquileres registrados</p>
        ) : (
          alquileres.map((a) => (
            <div key={a.id} className="fila-historial">
              <div className="info-alquiler">
                <strong>{a.vehículo.marca} {a.vehículo.modelo}</strong>
                <p className="cliente">{a.cliente}</p>
                <p className="dias">{a.diasAlquiler} día{a.diasAlquiler > 1 ? 's' : ''}</p>
              </div>
              <div className="detalles-alquiler">
                <span className="fecha">
                  {new Date(a.fecha).toLocaleDateString('es-CO')}
                </span>
                <span className="monto">${a.costoTotal.toLocaleString('es-CO')}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
