import { SolicitudServicioInfo } from '@/pages/servicios/usuario/viajarAhora';
import { ApiService } from '@/services/api.service';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const SolicitudesServicioList = () => {
  const [solicitudes, setSolicitudes] = useState<SolicitudServicioInfo[]>([]);
  const [apiService] = useState<ApiService>(new ApiService());

  useEffect(() => {
    apiService
      .get<SolicitudServicioInfo[]>('/solicitudes-servicios')
      .then((data) => {
        setSolicitudes(data);
      })
      .catch((err) => {
        console.log(err);
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo obtener las solicitudes',
        });
      });
  }, []);

  const eliminarSolicitud = (id: number) => {
    return apiService
      .delete<{ deleted: boolean }>(`/solicitudes-servicios/${id}`)
      .then(({ deleted }) => {
        if (!deleted) {
          return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudo eliminar la solicitud',
          });
        }
        const solicitudesFiltradas = solicitudes.filter(
          (solicitud) => solicitud.id !== id
        );

        setSolicitudes(solicitudesFiltradas);
      })
      .catch((err) => {
        console.log(err);
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo eliminar la solicitud',
        });
      });
  };

  return (
    <div className='row'>
      {solicitudes.map((solicitud) => (
        <div key={solicitud.id} className='col-lg-12 col-sm-12'>
          <ul className='mb-5'>
            <li>
              <strong>id: </strong> <span>{solicitud.id}</span>
            </li>
            <li>
              <strong>usuarioId: </strong> <span>{solicitud.usuarioId}</span>
            </li>
            <li>
              <strong>origen: </strong> <span>{solicitud.origen}</span>
            </li>
            <li>
              <strong>destino: </strong> <span>{solicitud.destino}</span>
            </li>
            <li>
              <strong>cantidadPasajeros: </strong>{' '}
              <span>{solicitud.cantidadPasajeros}</span>{' '}
            </li>
            <li>
              <strong>tipo: </strong> <span>{solicitud.tipo}</span>
            </li>
            <li>
              <strong>Maletas: </strong>{' '}
              <span>{solicitud.condicionesServicio?.maletas}</span>
            </li>
            <li>
              <strong>Mascotas: </strong>{' '}
              <span>{solicitud.condicionesServicio?.mascotas}</span>
            </li>
            <ul>
              {solicitud.paradas.map((parada) => (
                <li key={parada}>{parada}</li>
              ))}
            </ul>
            <button
              onClick={() => eliminarSolicitud(solicitud.id!)}
              type='button'
              className='px-4 rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-2 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400'
            >
              Agregar parada
            </button>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SolicitudesServicioList;
