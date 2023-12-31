import { ApiService } from '@/services/api.service';
import Link from 'next/link';
import React, { useState } from 'react';
import useForm from '../hooks/useForm';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import { tokenToString } from 'typescript';

export interface TokenPayload {
  sub: string;
  phoneNumber: string;
  roles: [{ role: string; label: string }];
  name: string;
  uuid: string;
  iat: number;
  exp: number;
}

export interface LoginResponse {
  accessToken: string;
  idToken: string;
}

interface UserLoginInfo {
  email: string;
  password: string;
}

const loginPage = () => {
  const router = useRouter();
  const { formValues, handleInputChange, resetForm } = useForm<UserLoginInfo>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<UserLoginInfo>>({});

  const { email, password } = formValues;

  const [apiService] = React.useState<ApiService>(new ApiService());

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    if (email === '') {
      setErrors({ ...errors, email: 'El correo es requerido' });
      return;
    }
    if (password === '') {
      setErrors({ ...errors, password: 'La contraseña es requerida' });
      return;
    }
    event.preventDefault();
    apiService
      .post<any>({ ...formValues }, '/auth/login')
      .then((response: any) => {
        localStorage.setItem('access_token', response.accessToken);
        localStorage.setItem('id_token', response.idToken);
        router.push('/servicios/usuario');
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo ingresar el usuario',
        });
      });
  };

  return (
    <div className='flex flex-row justify-center items-center h-screen'>
      <div className='relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border'>
        <div className='relative grid mx-4 mb-4 -mt-6 overflow-hidden text-white shadow-lg h-28 place-items-center rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-border shadow-blue-500/40'>
          <h3 className='block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-white'>
            Ingresa a SSMU
          </h3>
        </div>
        <div className='flex flex-col gap-4 p-6'>
          <div className='relative h-11 w-full min-w-[200px]'>
            <input
              type='email'
              id='email'
              className='w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
              name='email'
              value={email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <small id='err-email' className='text-red-500'>
                El correo es inválido
              </small>
            )}

            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Correo
            </label>
          </div>
          <div className='relative mt-5 h-11 w-full min-w-[200px]'>
            <input
              id='password'
              autoComplete='current-password'
              type='password'
              name='password'
              value={password}
              onChange={handleInputChange}
              className='w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
            />
            {errors.password && (
              <small id='err-password' className='text-red-500'>
                La contraseña es invalida
              </small>
            )}

            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Constraseña
            </label>
          </div>
        </div>
        <div className='p-6 pt-0'>
          <button
            className='block w-full select-none rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
            type='submit'
            id='login-btn'
            onClick={handleSubmit}
            data-ripple-light='true'
          >
            Iniciar Sesión
          </button>
          <p className='flex justify-center mt-6 font-sans text-sm antialiased font-light leading-normal text-inherit'>
            ¿Aún no tienes cuenta?
            <Link
              id='a_register'
              href='/servicios/usuario/auth/register'
              className='block ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-500'
            >
              Regístrate!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default loginPage;
