import React, { Fragment } from 'react';

interface SolicitudesPaginacionProps {
  paginationInfo: {
    totalPages: number;
    totalElements: number;
    currentPage: number;
    currentElements: number;
  };
  traerSiguientePagina: () => void;
  traerAnteriorPagina: () => void;
}

const SolicitudesPaginacion = (props: SolicitudesPaginacionProps) => {
  const { totalPages, totalElements, currentPage, currentElements } =
    props.paginationInfo;

  const irAPaginaSiguiente = () => {
    props.traerSiguientePagina();
  };
  const irAPaginaAnterior = () => {
    props.traerAnteriorPagina();
  };

  return (
    <Fragment>
      <div className='w-full text-center mb-2'>
        <p>
          Página {currentPage + 1} de {totalPages}, se muestran{' '}
          {currentElements} de {totalElements} elementos
        </p>
      </div>
      <div className='flex justify-center mb-5'>
        <button
          onClick={() => irAPaginaAnterior()}
          disabled={currentPage === 0}
          type='button'
          className='mx-1 px-4 rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-2 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400'
        >
          Página anterior
        </button>
        <button
          onClick={() => irAPaginaSiguiente()}
          type='button'
          disabled={currentPage === totalPages - 1}
          className='mx-1 px-4 rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-2 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400'
        >
          Página siguiente
        </button>
      </div>
    </Fragment>
  );
};

export default SolicitudesPaginacion;
