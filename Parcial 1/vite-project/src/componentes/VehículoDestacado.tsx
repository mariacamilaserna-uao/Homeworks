import type { Vehículo } from '../types';

interface Props {
  vehículo: Vehículo | null;
  onAlquilar: (vehículo: Vehículo) => void;
  dias?: string;
}

export function VehículoDestacado({ vehículo, onAlquilar, dias = '1' }: Props) {
  if (!vehículo) {
    return (
      <div className="destacado-contenedor">
        <div className="destacado-vacío">
          <p>Cargando vehículo destacado...</p>
        </div>
      </div>
    );
  }

  const costoEstimado = vehículo.precioDiario * parseInt(dias);

  return (
    <div className="destacado-contenedor">
      <div className="destacado-card">
        <div className="destacado-badge">OFERTA DESTACADA</div>
        <h2>{vehículo.marca} {vehículo.modelo}</h2>
        <div className="detalle-auto">
          <div className="item-detalle">
            <span className="label">Categoría:</span>
            <span className="valor">{vehículo.categoria}</span>
          </div>
          <div className="item-detalle">
            <span className="label">Placa:</span>
            <span className="valor">{vehículo.placa}</span>
          </div>
          <div className="item-detalle">
            <span className="label">Tarifa diaria:</span>
            <span className="valor">${vehículo.precioDiario.toLocaleString('es-CO')}</span>
          </div>
          <div className="item-detalle costo-total">
            <span className="label">Costo estimado ({dias} días):</span>
            <span className="valor">${costoEstimado.toLocaleString('es-CO')}</span>
          </div>
        </div>
        <button 
          className="btn-alquilar-destacado"
          onClick={() => onAlquilar(vehículo)}
        >
          Reservar vehículo
        </button>
      </div>
    </div>
  );
}
