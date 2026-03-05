import type { Inversionista } from '../types';

interface Props {
  inversionistas: Inversionista[];
  ingresoTotal?: number;
}

export function ListaInversionistas({ inversionistas, ingresoTotal = 0 }: Props) {
  return (
    <div className="seccion">
      <h3>Inversionistas Activos ({inversionistas.length})</h3>
      <div className="inversionistas">
        {inversionistas.length === 0 ? (
          <p className="vacio">Sin inversionistas registrados</p>
        ) : (
          inversionistas.map((i) => {
            const ganancia = (ingresoTotal * i.porcentaje) / 100;
            return (
              <div key={i.id} className="tarjeta-inversionista">
                <div className="info-inversor">
                  <div className="nombre">{i.nombre}</div>
                  <div className="participacion">{i.porcentaje}%</div>
                </div>
                <div className="ganancia">
                  <span className="label">Ganancia:</span>
                  <span className="cantidad">${ganancia.toLocaleString('es-CO')}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
