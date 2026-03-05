import { useState, useEffect } from 'react';
import { SistemaMovilidad } from '../sistema';
import type { Vehículo } from '../types';
import { VehículoDestacado } from './VehículoDestacado';
import { ListaDisponibles } from './ListaDisponibles';
import { HistorialAlquileres } from './HistorialAlquileres';
import { ListaInversionistas } from './ListaInversionistas';

export function AppMovilidad() {
  const [sistema] = useState(() => {
    const s = new SistemaMovilidad();
    const vehículos: Vehículo[] = [
      { id: '1', placa: 'ABC-123', modelo: 'Corolla', marca: 'Toyota', precioDiario: 45000, categoria: 'Económico' },
      { id: '2', placa: 'DEF-456', modelo: 'Civic', marca: 'Honda', precioDiario: 55000, categoria: 'Ejecutivo' },
      { id: '3', placa: 'GHI-789', modelo: 'Mazda3', marca: 'Mazda', precioDiario: 60000, categoria: 'Ejecutivo' },
      { id: '4', placa: 'JKL-012', modelo: 'Elantra', marca: 'Hyundai', precioDiario: 50000, categoria: 'Económico' },
      { id: '5', placa: 'MNO-345', modelo: 'Sentra', marca: 'Nissan', precioDiario: 52000, categoria: 'Económico' },
    ];
    vehículos.forEach((v) => s.agregarVehículo(v));
    s.agregarInversionista({ id: '1', nombre: 'Peruanito inversionista', porcentaje: 40 });
    s.agregarInversionista({ id: '2', nombre: 'Gabriel García', porcentaje: 35 });
    s.agregarInversionista({ id: '3', nombre: 'Warren Buffett', porcentaje: 25 });
    return s;
  });

  const [destacado, setDestacado] = useState(sistema.getDestacado());
  const [disponibles, setDisponibles] = useState(sistema.getVehículosDisponibles());
  const [historial, setHistorial] = useState(sistema.getHistorial());
  const [inversionistas] = useState(sistema.getInversionistas());
  const [cliente, setCliente] = useState('');
  const [dias, setDias] = useState('1');

  useEffect(() => {
    const intervalo = setInterval(() => {
      sistema.rotarDestacado();
      setDestacado(sistema.getDestacado());
    }, 5000);
    return () => clearInterval(intervalo);
  }, [sistema]);

  const handleAlquilar = (vehículo: Vehículo) => {
    if (!cliente.trim()) {
      alert('Por favor ingresa el nombre del cliente');
      return;
    }
    if (!dias || parseInt(dias) < 1) {
      alert('Por favor ingresa un número válido de días');
      return;
    }

    const diasNum = parseInt(dias);
    const costoTotal = vehículo.precioDiario * diasNum;

    sistema.alquilarVehículoConCosto(vehículo, cliente, diasNum, costoTotal);
    setDisponibles(sistema.getVehículosDisponibles());
    setHistorial(sistema.getHistorial());
    setCliente('');
    setDias('1');
  };

  const totalAlquileres = historial.reduce((sum, a) => sum + a.costoTotal, 0);

  return (
    <div className="app-movilidad">
      <header className="header">
        <h1>SISTEMA DE ALQUILER DE VEHÍCULOS</h1>
        <p>Gestión profesional de flota vehicular</p>
      </header>
      <main className="contenido">
        <section className="panel-entrada">
          <div className="entrada-grupo">
            <input
              type="text"
              placeholder="Nombre del cliente"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              className="input"
            />
            <input
              type="number"
              min="1"
              placeholder="Días"
              value={dias}
              onChange={(e) => setDias(e.target.value)}
              className="input input-dias"
            />
          </div>
        </section>
        <section className="panel-principal">
          <VehículoDestacado vehículo={destacado} onAlquilar={handleAlquilar} dias={dias} />
        </section>
        <section className="panel-secundario">
          <div className="columna">
            <ListaDisponibles vehículos={disponibles} onAlquilar={handleAlquilar} dias={dias} />
          </div>
          <div className="columna">
            <HistorialAlquileres alquileres={historial} />
            <div className="seccion resumen">
              <h3>Resumen Ingresos</h3>
              <div className="ingreso-total">
                <span>Total generado:</span>
                <span className="monto">${totalAlquileres.toLocaleString('es-CO')}</span>
              </div>
            </div>
          </div>
          <div className="columna">
            <ListaInversionistas inversionistas={inversionistas} ingresoTotal={totalAlquileres} />
          </div>
        </section>
      </main>
      <footer className="footer">
        <p>Sistema de Gestión de Movilidad Urbana 2025</p>
      </footer>
    </div>
  );
}
