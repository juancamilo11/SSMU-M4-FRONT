import { ApiService } from '@/services/api.service';
import { Dispatch, Fragment, SetStateAction, useState } from 'react';
import Swal from 'sweetalert2';
import SolicitudesPaquetesList from './components/SolicitudesPaqueteList';
import { ListaSolicitudesPaquetesResponse } from '@/pages/servicios/usuario/enviarRecogerPaquete';

interface SolicitudesPaquetesListProps {
  solicitudesPaquetes: ListaSolicitudesPaquetesResponse;
  setSolicitudesPaquetes: Dispatch<
    SetStateAction<ListaSolicitudesPaquetesResponse>
  >;
  activeTab: number;
  setActiceTab: Dispatch<SetStateAction<number>>;
}

const SolicitudesList = (props: SolicitudesPaquetesListProps) => {
  const {
    solicitudesPaquetes,
    setSolicitudesPaquetes,
    activeTab,
    setActiceTab,
  } = props;

  return (
    <Fragment>
      <div className='flex flex-wrap pr-10'>
        <div className='w-full'>
          <SolicitudesPaquetesList
            solicitudesPaquetes={solicitudesPaquetes}
            setSolicitudesPaquetes={setSolicitudesPaquetes}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default SolicitudesList;
