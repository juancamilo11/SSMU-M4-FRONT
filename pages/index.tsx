import { ExampleComponent } from '@/components/ExampleComponent';
import ServiceCard from '@/components/ServiceCard';
import Header from '@/components/shared/Header';

const Home = () => {
  return (
    <>
      <header className='flex w-full items-center justify-center mt-5'>
        <ExampleComponent text='Welcome to CodeF@ctory - SSMU' />
      </header>
      <main className='row'>
        <div className='col-lg-12 col-sm-12'>
          <div className='m-4 mb-5 overflow-auto m-0 p-0'>
            <div className='mt-20 flex items-center justify-center m-0 p-0'>
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
    </>
  );
};

export default Home;
