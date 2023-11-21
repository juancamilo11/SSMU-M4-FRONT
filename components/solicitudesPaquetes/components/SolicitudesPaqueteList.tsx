import { ListaSolicitudesPaquetesResponse } from '@/pages/servicios/usuario/enviarRecogerPaquete';
import { ApiService } from '@/services/api.service';
import { Dispatch, SetStateAction, useState } from 'react';
import Swal from 'sweetalert2';

interface SolicitudesPaquetesListProps {
  solicitudesPaquetes: ListaSolicitudesPaquetesResponse;
  setSolicitudesPaquetes: Dispatch<
    SetStateAction<ListaSolicitudesPaquetesResponse>
  >;
}

const SolicitudesPaquetesList = (props: SolicitudesPaquetesListProps) => {
  const { solicitudesPaquetes, setSolicitudesPaquetes } = props;

  const [apiService] = useState<ApiService>(new ApiService());

  const eliminarSolicitud = (id: number) => {
    return apiService
      .delete<any>(`/solicitudes-paquetes/${id}`, true)
      .then((response) => {
        const { deleted } = response;
        if (!deleted) {
          return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudo eliminar la solicitud',
          });
        }

        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'La solicitud se eliminó correctamente',
        });

        const { elements } = solicitudesPaquetes;
        const solicitudesFiltradas = elements.filter(
          (solicitud) => solicitud.id !== id
        );

        setSolicitudesPaquetes((solicitudes) => ({
          ...solicitudes,
          elements: solicitudesFiltradas,
        }));
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
    <div className='overflow-auto'>
      <div className='flex items-center justify-center m-0 p-0'>
        <div className='w-full bg-white rounded-lg shadow-lg'>
          <div className='px-6 m-0 p-0'>
            <h1 className='text-2xl font-semibold text-center text-gray-500 mt-4 mb-6'>
              Lista de Solicitudes Paquetes
            </h1>
            <div className='container'>
              <div className='row'>
                {solicitudesPaquetes.elements.map((solicitud) => (
                  <div key={solicitud.id} className='col-lg-12 col-sm-12'>
                    <ul className='mb-5'>
                      <li>
                        <strong>id: </strong> <span>{solicitud.id}</span>
                      </li>
                      <li>
                        <strong>Estado: </strong>{' '}
                        <span>{solicitud.activa ? 'ACTIVA' : 'INACTIVA'}</span>
                      </li>
                      <li>
                        <strong>usuarioId: </strong>{' '}
                        <span>{solicitud.usuarioId}</span>
                      </li>
                      <li>
                        <strong>origen: </strong>{' '}
                        <span>{solicitud.origen}</span>
                      </li>
                      <li>
                        <strong>destino: </strong>{' '}
                        <span>{solicitud.destino}</span>
                      </li>
                      <li>
                        <strong>Dimensiones: </strong>{' '}
                        <ul>
                          <li>
                            <strong>Alto: </strong>{' '}
                            <span>{solicitud.dimensiones.alto}</span>
                          </li>
                          <li>
                            <strong>Ancho: </strong>{' '}
                            <span>{solicitud.dimensiones.ancho}</span>
                          </li>
                          <li>
                            <strong>Largo: </strong>{' '}
                            <span>{solicitud.dimensiones.largo}</span>
                          </li>
                          <li>
                            <strong>Peso: </strong>{' '}
                            <span>{solicitud.dimensiones.peso}</span>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <strong>Es alimentos o mercado: </strong>
                        <span>{solicitud.alimentosOMercado ? 'SI' : 'NO'}</span>
                      </li>

                      <button
                        onClick={() => eliminarSolicitud(solicitud.id!)}
                        type='button'
                        className='px-4 rounded-2xl border-b-4 border-b-red-600 bg-red-500 py-2 font-bold text-white hover:bg-red-400 active:translate-y-[0.125rem] active:border-b-red-400'
                      >
                        Eliminar
                      </button>
                    </ul>
                  </div>
                ))}
              </div>
              {solicitudesPaquetes.paginationInfo.totalElements === 0 && (
                <div className='flex justify-center w-full bg-red-500'>
                  <p className='text-2xl font-semibold text-center text-gray-500 mt-4 mb-6'>
                    No hay solicitudes
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolicitudesPaquetesList;
