import Header from '@/components/shared/Header';
import Swal from 'sweetalert2';

export default function Socio() {
  const aceptarServicio = function () {
    Swal.fire({
      title: 'Nuevo servicio disponible',
      html: `<div>
            <div>
                <strong>Origen</strong>
                <p>Punto de partida</p>
            </div>
            <div>
                <strong>Paradas</strong>
                <p>Parada 1</p>
            </div>
            <div>
                <strong>Destino</strong>
                <p>Punto de llegada</p>
            </div>
            <div>
                <strong>Tiempo estimado</strong>
                <p>xx min</p>
            </div>
            <div>
                <strong>Valor</strong>
                <p>$00000</p>
            </div>
        </div>`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Rechazar',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.replace('/servicios/socio/seguimientoServicio');
      }
    });
  };

  return (
    <>
      <div className='m-4 mb-5 overflow-auto m-0 p-0'>
        <div className='mt-20 flex items-center justify-center m-0 p-0'>
          <Header />
          <div className='max-w-md w-full bg-white rounded-lg'>
            <div className='px-6 m-0 p-0'>
              <button
                onClick={aceptarServicio}
                type='submit'
                className='my-8 mb-8 w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-2 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:bord    er-b-blue-400'
              >
                Estoy disponible
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
