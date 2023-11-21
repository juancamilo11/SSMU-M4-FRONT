import { ApiService } from '@/services/api.service';
import Link from 'next/link';
import React from 'react';
import useForm from '../hooks/useForm';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

interface UserRegisterInfo {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  role: 'ROLE_USUARIO' | 'ROLE_SOCIO';
}

const registerPage = () => {
  const router = useRouter();
  const { formValues, handleInputChange, handleSelectChange, resetForm } =
    useForm<UserRegisterInfo>({
      email: '',
      password: '',
      fullName: '',
      phone: '',
      role: 'ROLE_USUARIO',
    });

  const { email, fullName, password, phone, role } = formValues;

  const [apiService] = React.useState<ApiService>(new ApiService());

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault();
    apiService
      .post<any>({ ...formValues }, '/auth/register')
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Registrado',
          text: 'El usuario se registró correctamente',
        });
        router.push('/servicios/usuario/auth/login');
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo registrar el usuario',
        });
      });
  };

  return (
    <div className='flex flex-row justify-center items-center h-screen'>
      <form className='relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border'>
        <div className='relative grid mx-4 mb-4 -mt-6 overflow-hidden text-white shadow-lg h-28 place-items-center rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-border shadow-blue-500/40'>
          <h3 className='block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-white'>
            Registro SSMU
          </h3>
        </div>

        <div className='flex flex-col gap-4 p-6'>
          <div className='relative h-11 w-full min-w-[200px] mb-4'>
            <input
              type='email'
              name='email'
              value={email}
              onChange={handleInputChange}
              id='email'
              className='w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Correo
            </label>
          </div>

          <div className='relative h-11 w-full min-w-[200px] mb-4'>
            <input
              type='text'
              name='fullName'
              value={fullName}
              onChange={handleInputChange}
              id='fullName'
              className='w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Nombre completo
            </label>
          </div>

          <div className='relative mb-6'>
            {/* <label className='block mb-2 text-sm text-gray-600'>
              Número de viajeros
            </label> */}
            <select
              name='role'
              value={role}
              onChange={handleSelectChange}
              id='role'
              className='w-full bg-transparent ring-2 ring-gray-300 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500'
            >
              <option value='ROLE_USUARIO'>Usuario</option>
              <option value='ROLE_SOCIO'>Socio</option>
            </select>
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Teléfono
            </label>
          </div>
          <div className='relative h-11 w-full min-w-[200px] mb-4'>
            <input
              type='text'
              id='phone'
              name='phone'
              value={phone}
              onChange={handleInputChange}
              className='w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
            />

            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Teléfono
            </label>
          </div>

          <div className='relative h-11 w-full min-w-[200px]'>
            <input
              id='password'
              autoComplete='current-password'
              type='password'
              name='password'
              value={password}
              onChange={handleInputChange}
              className='w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Constraseña
            </label>
          </div>
        </div>

        <div className='p-6 pt-0'>
          <button
            className='block w-full select-none rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
            data-ripple-light='true'
            type='button'
            onClick={handleSubmit}
          >
            Registrarse
          </button>

          <p className='flex justify-center mt-6 font-sans text-sm antialiased font-light leading-normal text-inherit'>
            ¡Ya tienes una cuenta!
            <Link
              href='/servicios/usuario/auth/login'
              className='block ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-500 '
            >
              Ingresa
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default registerPage;
