import { ListaSolicitudesServicioResponse } from '@/pages/servicios/usuario/viajarAhora';
import { ApiService } from '@/services/api.service';
import React, { Dispatch, SetStateAction, useState } from 'react';
import Swal from 'sweetalert2';

interface SolicitudesInmediatasListProps {
  solicitudesInmediatas: ListaSolicitudesServicioResponse;
  setSolicitudesInmediatas: Dispatch<
    SetStateAction<ListaSolicitudesServicioResponse>
  >;
}

const SolicitudesInmediatasList = (props: SolicitudesInmediatasListProps) => {
  const { solicitudesInmediatas, setSolicitudesInmediatas } = props;

  const [apiService] = useState<ApiService>(new ApiService());

  const eliminarSolicitud = (id: number) => {
    return apiService
      .delete<any>(`/solicitudes-servicios/${id}`, true)
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

        const { elements } = solicitudesInmediatas;
        const solicitudesFiltradas = elements.filter(
          (solicitud) => solicitud.id !== id
        );

        setSolicitudesInmediatas((solicitudes) => ({
          ...solicitudes,
          elements: solicitudesFiltradas,
        }));
      })
      .catch((err) => {
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
              Lista de Solicitudes Inmediatas
            </h1>
            <div className='container'>
              <div className='row'>
                {solicitudesInmediatas.elements
                  .filter(({ inmediato }) => inmediato)
                  .map((solicitud) => (
                    <div key={solicitud.id} className='col-lg-12 col-sm-12'>
                      <ul className='mb-5'>
                        <li>
                          <strong>id: </strong> <span>{solicitud.id}</span>
                        </li>
                        <li>
                          <strong>Estado: </strong>{' '}
                          <span>
                            {solicitud.activa ? 'ACTIVA' : 'INACTIVA'}
                          </span>
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
                          <strong>cantidadPasajeros: </strong>{' '}
                          <span>{solicitud.cantidadPasajeros}</span>{' '}
                        </li>
                        <li>
                          <strong>tipo: </strong> <span>{solicitud.tipo}</span>
                        </li>
                        <li>
                          <strong>Maletas: </strong>{' '}
                          <span>
                            {solicitud.condicionesServicio.maletas
                              ? 'SI'
                              : 'NO'}
                          </span>
                        </li>
                        <li>
                          <strong>Mascotas: </strong>{' '}
                          <span>
                            {solicitud.condicionesServicio.mascotas
                              ? 'SI'
                              : 'NO'}
                          </span>
                        </li>
                        <ul>
                          {solicitud.paradas?.map((parada, index) => (
                            <li key={parada}>
                              <span>Parada #{index + 1}: </span>
                              <strong>{parada}</strong>
                            </li>
                          ))}
                        </ul>
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
              {solicitudesInmediatas.paginationInfo.totalElements === 0 && (
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

export default SolicitudesInmediatasList;
