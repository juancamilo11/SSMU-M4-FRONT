import Header from '@/components/shared/Header';
import Searching from '@/components/Searching';
import { useEffect } from 'react';

export default function alquilerPorHoras() {
  useEffect(() => {
    setTimeout(() => {
      window.location.replace('/servicios/usuario/seguimientoServicio');
    }, 3000);
  }, []);
  return (
    <>
      <div className='m-4 mb-5 overflow-auto m-0 p-0'>
        <div className='flex items-center justify-center m-0 p-0'>
          <Header />
          <div className='max-w-md w-full bg-white rounded-lg shadow-lg'>
            <Searching />
          </div>
        </div>
      </div>
    </>
  );
}
