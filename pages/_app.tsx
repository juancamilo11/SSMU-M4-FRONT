import { ApiService } from '@/services/api.service';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { LoginResponse } from './servicios/usuario/auth/login';

const App = ({ Component, pageProps }: AppProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [apiService] = useState(new ApiService());

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setLoading(false);
      router.replace('/servicios/usuario/auth/login');
      return;
    }
    const tokenRequest = `Bearer ${token}`;
    apiService
      .get<LoginResponse>('/auth/refresh', undefined, true)
      .then(({ accessToken, idToken }) => {
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('id_token', idToken);
        setLoading(false);
      })
      .catch((err) => {
        router.replace('/servicios/usuario/auth/login');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Fragment>
      {loading ? (
        <div className='w-screen h-screen flex justify-center items-center bg-transparent'>
          <div>
            <p className='text-center'>Cargando...</p>
            <img
              src='/images/common/loading.svg'
              alt='loading'
              className='bg-white'
            />
          </div>
        </div>
      ) : (
        <Component {...pageProps} />
      )}
    </Fragment>
  );
};

export default App;
