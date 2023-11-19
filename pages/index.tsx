import ServiceCard from '@/components/ServiceCard';
import DynamicHeader from '@/components/shared/DynamicHeader';
import Header from '@/components/shared/Header';
import { Fragment } from 'react';

const Home = () => {
  return (
    <Fragment>
      <div className='container mt-20 mx-auto w-full flex  justify-center'>
        <img src='/images/logosimbolo-udea.png' alt='' />
      </div>

      <div className='container mx-auto w-full flex  justify-center'>
        <h1 className='text-3xl text-center'>
          Sistema de Servicio de Movilidad Urbana
        </h1>
      </div>
      <header className='flex w-full items-center justify-center mt-5'>
        <DynamicHeader title='Welcome to CodeF@ctory - SSMU' />
      </header>

      <main className='row'>
        <div className='col-lg-12 col-sm-12'>
          <div className='mb-5 overflow-auto m-0 p-0'>
            <div className='mt-10 flex items-center justify-center m-0 p-0'>
              <div className='max-w-md w-full bg-white rounded-lg'>
                <div className='px-6 m-0 p-0'>
                  <h1 className='text-2xl font-semibold text-center text-gray-500 mt-4 mb-6'>
                    Servicios
                  </h1>
                  <div>
                    <ServiceCard
                      title='Viajar'
                      imgSource='/images/solicitudesServicio/car.png'
                      url='/servicios/usuario/viajarAhora'
                    />
                    <ServiceCard
                      title='Paquetes'
                      imgSource='/images/solicitudesServicio/box.png'
                      url='/servicios/usuario/enviarRecogerPaquete'
                    />
                    {/* <ServiceCard
                      title='Reservado'
                      imgSource='/images/solicitudesServicio/calendar.png'
                      url='/servicios/usuario/reservarServicio'
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default Home;
