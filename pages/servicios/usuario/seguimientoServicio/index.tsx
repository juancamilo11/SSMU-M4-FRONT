import Header from '@/components/shared/Header';
import Map from '@/components/SolicitudesServicios/Map';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

export default function seguimientoServicio() {
  useEffect(() => {
    Swal.fire({
      title: 'Socio encontrado!',
      html:
        '<p>El servicio iniciará pronto! Espera en el punto de recogida</p>' +
        '<br></br>' +
        '<p><strong>Placa:</strong> SSS000</p>' +
        '<p><strong>Color:</strong> color</p>',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Entendido',
    });
  }, []);

  const cancelarServicio = function () {
    Swal.fire({
      title: '¿Estás seguro?',
      html: '<p>¿Seguro que quieres cancelar el servicio?</p>',
      showCancelButton: false,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Cancelar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Servicio cancelado',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
        }).then(() => {
          window.location.replace('/servicios/usuario');
        });
      }
    });
  };

  return (
    <>
      <div className='m-4 mb-5 overflow-auto m-0 p-0'>
        <div className='flex items-center justify-center m-0 p-0'>
          <Header />
          <div className='max-w-md w-full bg-white rounded-lg shadow-lg'>
            <div className='mt-24 px-6 m-0 p-0'>
              <h1 className='text-2xl font-semibold text-center text-gray-500 mt-4 mb-6'>
                Seguimiento del servicio
              </h1>
              <div className='mb-6 pb-0 border-b border-gray-200 text-gray-800'>
                <div className='w-full flex mb-3 items-center'>
                  <div className='flex-grow'>
                    <span className='text-gray-600'>Origen</span>
                  </div>
                  <div className='pl-3'>
                    <span className='font-semibold'>Punto de origen</span>
                  </div>
                </div>
                <div className='w-full flex mb-3 items-center'>
                  <div className='flex-grow'>
                    <span className='text-gray-600'>Destino</span>
                  </div>
                  <div className='pl-3'>
                    <span className='font-semibold'>Punto destino</span>
                  </div>
                </div>
                <div className='w-full flex mb-3 items-center'>
                  <div className='flex-grow'>
                    <span className='text-gray-600'>Placa del vehículo</span>
                  </div>
                  <div className='pl-3'>
                    <span className='font-semibold'>AAA000</span>
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <button className='rounded-2xl border-b-2 border-b-gray-300 bg-white px-4 py-2 font-bold text-blue-600 ring-2 ring-gray-300 hover:bg-gray-200 active:translate-y-[0.125rem] active:border-b-gray-200'>
                    Llamar
                  </button>
                  <button className='rounded-2xl border-b-2 border-b-gray-300 bg-white px-4 py-2 font-bold text-blue-600 ring-2 ring-gray-300 hover:bg-gray-200 active:translate-y-[0.125rem] active:border-b-gray-200'>
                    Chatear
                  </button>
                </div>
              </div>
              <Map></Map>

              <button
                onClick={cancelarServicio}
                type='submit'
                className='my-8 mb-8 w-full rounded-2xl border-b-4 border-b-red-600 bg-red-500 py-2 font-bold text-white hover:bg-red-400 active:translate-y-[0.125rem] active:bord    er-b-red-400'
              >
                Cancelar servicio
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
