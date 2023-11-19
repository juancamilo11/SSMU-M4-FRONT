import { ListaSolicitudesServicioResponse } from '@/pages/servicios/usuario/viajarAhora';
import { ApiService } from '@/services/api.service';
import { Dispatch, Fragment, SetStateAction, useState } from 'react';
import Swal from 'sweetalert2';
import SolicitudesInmediatasList from './components/SolicitudesInmediatasList';
import SolicitudesReservadasList from './components/SolicitudesReservadasList';

interface SolicitudesServicioListProps {
  solicitudesServicio: ListaSolicitudesServicioResponse;
  setSolicitudesServicio: Dispatch<
    SetStateAction<ListaSolicitudesServicioResponse>
  >;
  activeTab: number;
  setActiceTab: Dispatch<SetStateAction<number>>;
}

const SolicitudesList = (props: SolicitudesServicioListProps) => {
  const {
    solicitudesServicio,
    setSolicitudesServicio,
    activeTab,
    setActiceTab,
  } = props;

  const [apiService] = useState<ApiService>(new ApiService());

  const [openTab, setOpenTab] = useState(activeTab);
  const [color, setColor] = useState('blue');

  const cambiarTabActiva = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    tabNumber: number
  ): void => {
    event.preventDefault();
    setOpenTab(tabNumber);
    setActiceTab(tabNumber);
  };

  return (
    <Fragment>
      <div className='flex flex-wrap pr-10'>
        <div className='w-full'>
          <ul
            className='flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row'
            role='tablist'
          >
            <li className='-mb-px mr-2 last:mr-0 flex-auto text-center'>
              <a
                className={
                  'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                  (openTab === 0
                    ? 'text-white bg-' + color + '-600'
                    : 'text-' + color + '-600 bg-white')
                }
                onClick={(e) => cambiarTabActiva(e, 0)}
                data-toggle='tab'
                href='#link0'
                role='tablist'
              >
                <i className='fas fa-space-shuttle text-base mr-1'></i>{' '}
                Servicios Inmediatos
              </a>
            </li>
            <li className='-mb-px mr-2 last:mr-0 flex-auto text-center'>
              <a
                className={
                  'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                  (openTab === 1
                    ? 'text-white bg-' + color + '-600'
                    : 'text-' + color + '-600 bg-white')
                }
                onClick={(e) => cambiarTabActiva(e, 1)}
                data-toggle='tab'
                href='#link1'
                role='tablist'
              >
                <i className='fas fa-cog text-base mr-1'></i> Servicios
                Reservados
              </a>
            </li>
          </ul>
          <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded'>
            <div className='px-4 py-5 flex-auto'>
              <div className='tab-content tab-space'>
                <div className={openTab === 0 ? 'block' : 'hidden'} id='link1'>
                  <SolicitudesInmediatasList
                    solicitudesInmediatas={solicitudesServicio}
                    setSolicitudesInmediatas={setSolicitudesServicio}
                  />
                </div>
                <div className={openTab === 1 ? 'block' : 'hidden'} id='link2'>
                  <SolicitudesReservadasList
                    solicitudesReservadas={solicitudesServicio}
                    setSolicitudesReservadas={setSolicitudesServicio}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SolicitudesList;
