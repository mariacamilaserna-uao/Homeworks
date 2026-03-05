import type { Vehículo } from '../types';

interface Props {
  vehículos: Vehículo[];
  onAlquilar: (vehículo: Vehículo) => void;
  dias?: string;
}

export function ListaDisponibles({ vehículos, onAlquilar, dias = '1' }: Props) {
  if (vehículos.length === 0) {
    return (
      <div className="seccion">
        <h3>Vehículos Disponibles</h3>
        <p className="vacio">No hay vehículos disponibles en este momento</p>
      </div>
    );
  }

  return (
    <div className="seccion">
      <h3>Vehículos Disponibles ({vehículos.length})</h3>
      <div className="grilla-vehículos">
        {vehículos.map((v) => (
          <div key={v.id} className="tarjeta-vehículo">
            <div className="info-veh">
              <h4>{v.marca} {v.modelo}</h4>
              <p className="placa">{v.placa}</p>
              <p className="categoria">{v.categoria}</p>
              <p className="precio">${v.precioDiario.toLocaleString('es-CO')}/día</p>
              <p className="costo">${(v.precioDiario * parseInt(dias)).toLocaleString('es-CO')} ({dias}d)</p>
            </div>
            <button 
              className="btn-pequeño"
              onClick={() => onAlquilar(v)}
            >
              Reservar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
