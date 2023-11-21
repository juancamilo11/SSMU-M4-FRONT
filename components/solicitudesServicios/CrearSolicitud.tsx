import Header from '@/components/shared/Header';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { ApiService } from '@/services/api.service';
import { Dispatch, SetStateAction, useState, Fragment, useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { ListaSolicitudesServicioResponse } from '@/pages/servicios/usuario/viajarAhora';
import { TokenPayload } from '@/pages/servicios/usuario/auth/login';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';

// Generated by https://quicktype.io

export enum VehicleType {
  NORMAL = 'NORMAL',
  LUJO = 'LUJO',
}

export interface SolicitudServicioInfo {
  id?: number;
  activa?: boolean;
  inmediato: boolean;
  origen: string;
  destino: string;
  cantidadPasajeros: number;
  tipo: VehicleType;
  condicionesServicio: CondicionesServicio;
  fecha: string;
  paradas: string[];
}

export interface CondicionesServicio {
  mascotas: boolean;
  maletas: boolean;
}

interface CrearSolicitudServicioProps {
  setSolicitudesServicio: Dispatch<
    SetStateAction<ListaSolicitudesServicioResponse>
  >;
  activeTab: number;
}

const CrearSolicitud = (props: CrearSolicitudServicioProps) => {
  const { setSolicitudesServicio, activeTab } = props;
  const {
    register,
    unregister,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  const apiService = new ApiService();
  let [paradas, setParadas] = useState<string[]>([]);

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = `0${now.getMonth() + 1}`.slice(-2);
    const day = `0${now.getDate()}`.slice(-2);
    const hours = `0${now.getHours()}`.slice(-2);
    const minutes = `0${now.getMinutes()}`.slice(-2);

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const onSubmit = async function (data: any) {
    data.paradas = [];

    Object.entries(data).forEach(([key, value]) => {
      if (
        key.includes('parada') &&
        getValues(key) != undefined &&
        getValues(key) != ''
      ) {
        data.paradas.push(getValues(key));
        delete data[key];
      }
    });

    // await apiService.post(data, 'url endpoint').then((rta:any) =>{
    //   Swal.fire({title: rta.message, focusConfirm: false, confirmButtonColor: '#3085d6', confirmButtonText: 'Aceptar'})
    // });
    // window.location.replace('/servicios/usuario/buscandoSocio');
    const solicitudServicioInfo: SolicitudServicioInfo = {
      origen: data.start,
      destino: data.destiny,
      cantidadPasajeros: +data.passengersNumber,
      tipo: data.vehicleCategory,
      inmediato: isChecked,
      condicionesServicio: {
        maletas: data.suitcase,
        mascotas: data.pet,
      },
      fecha: new Date()
        .toISOString()
        .split('T')[0]
        .concat(`T${data.time}:00.000Z`),
      paradas: data.paradas,
    };

    return apiService
      .post(solicitudServicioInfo, '/solicitudes-servicios', true)
      .then((response) => {
        Swal.fire({
          title: `Solicitud Realizada.\n
          ¡Esperando que un socio acepte tu viaje!`,
          focusConfirm: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar',
        });
        setSolicitudesServicio((solicitudesActuales) => ({
          ...solicitudesActuales,
          elements: [...solicitudesActuales.elements, response],
        }));
      });
  };

  const agregarParada = function () {
    setParadas((prevParadas) => [...prevParadas, '']);
  };

  const [isChecked, setIsChecked] = useState(activeTab === 0);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Fragment>
      <div className='m-0 p-0'>
        <div className='flex items-center justify-center m-0 p-0'>
          <Header />
          <div className='max-w-md w-full bg-white rounded-lg shadow-lg'>
            <div className='mt-20 px-6 m-0 p-0'>
              <h1 className='text-2xl font-semibold text-center text-gray-500 mt-4 mb-6'>
                Servicio de viaje
              </h1>
              <form>
                <div className='mb-4'>
                  <label className='block mb-2 text-sm text-gray-600'>
                    Punto de partida
                  </label>
                  <input
                    type='text'
                    id='start'
                    className='w-full bg-transparent ring-2 ring-gray-300 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500'
                    required
                    {...register('start', {
                      required: true,
                      value: 'La Ceja, Antioquia',
                    })}
                  />
                  {errors.start?.type === 'required' && (
                    <p className='text-red-500'>
                      Establece un punto de partida
                    </p>
                  )}
                </div>
                {/* ---------------------------------- */}
                <div className='relative mt-2 mb-2'>
                  <label className='flex cursor-pointer select-none items-center'>
                    <p className='mr-2'>¿Servicio inmediato?</p>
                    <div className='relative'>
                      <input
                        type='checkbox'
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        className='sr-only'
                      />
                      <div
                        className={`box block h-8 w-14 rounded-full bg-blue-500 ${
                          isChecked ? 'bg-primary' : 'bg-dark'
                        }`}
                      ></div>
                      <div
                        className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
                          isChecked
                            ? 'translate-x-full bg-green-500'
                            : 'bg-green-100'
                        }`}
                      ></div>
                    </div>
                  </label>
                </div>
                {/* ---------------------------------- */}
                {paradas.map(
                  (parada: any, i: number = paradas.indexOf(parada)) => {
                    return (
                      <div key={i} className='mb-4'>
                        <div className='flex justify-between'>
                          <label className='block mb-2 text-sm text-gray-600'>
                            Parada {i + 1}
                          </label>
                          {/* <label onClick={()=>{unregister(`parada${i+1}`);setParadas(paradas.splice(0,paradas.length-1))}} className="block mb-2 text-sm text-red-600">Quitar</label> */}
                        </div>
                        <input
                          type='text'
                          id='parada'
                          className='w-full bg-transparent ring-2 ring-gray-300 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500'
                          required
                          {...register(`parada${i + 1}`, { required: true })}
                        />
                      </div>
                    );
                  }
                )}
                <div className='mb-4'>
                  <label className='block mb-2 text-sm text-gray-600'>
                    ¿A donde viajas?
                  </label>
                  <input
                    type='text'
                    id='destiny'
                    className='w-full bg-transparent ring-2 ring-gray-300 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500'
                    required
                    {...register('destiny', {
                      required: true,
                      value: 'Medellín',
                    })}
                  />
                  {errors.destiny?.type === 'required' && (
                    <p className='text-red-500'>
                      Establece un punto de llegada
                    </p>
                  )}
                </div>
                <div className='mb-4'>
                  <button
                    onClick={agregarParada}
                    type='button'
                    className='w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-2 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400'
                  >
                    Agregar parada
                  </button>
                  {paradas.length > 0 && (
                    <button
                      onClick={() => {
                        unregister(`parada${paradas.length}`);
                        setParadas(paradas.splice(0, paradas.length - 1));
                      }}
                      type='button'
                      className='w-full rounded-2xl border-b-4 border-b-red-600 bg-red-500 py-2 font-bold text-white hover:bg-red-400 active:translate-y-[0.125rem] active:border-b-red-400 mt-4'
                    >
                      Quitar parada
                    </button>
                  )}
                </div>
                <div className='mb-6'>
                  <label className='block mb-2 text-sm text-gray-600'>
                    Número de viajeros
                  </label>
                  <select
                    id='passengersNumber'
                    className='w-full bg-transparent ring-2 ring-gray-300 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500'
                    required
                    {...register('passengersNumber', {
                      required: true,
                      value: 3,
                    })}
                  >
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                  </select>
                  {errors.passengersNumber?.type === 'required' && (
                    <p className='text-red-500'>
                      Selecciona el número de pasajeros
                    </p>
                  )}
                </div>
                <div className='mb-6'>
                  <label className='block mb-2 text-sm text-gray-600'>
                    Tipo de vehículo
                  </label>
                  <select
                    id='vehicleCategory'
                    className='w-full bg-transparent ring-2 ring-gray-300 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500'
                    required
                    {...register('vehicleCategory', {
                      required: true,
                      value: 'NORMAL',
                    })}
                  >
                    <option value='NORMAL'>Estandar</option>
                    <option value='LUJO'>Premium</option>
                  </select>
                  {errors.vehicleCategory?.type === 'required' && (
                    <p className='text-red-500'>
                      Selecciona el tipo de vehículo
                    </p>
                  )}
                </div>
                {activeTab === 0 ? (
                  <div className='mb-6'>
                    <label className='block mb-2 text-sm text-gray-600'>
                      Hora del viaje
                    </label>
                    <input
                      type='time'
                      id='time'
                      className='w-full bg-transparent ring-2 ring-gray-300 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500'
                      required
                      {...register('time', { required: true, value: '14:00' })}
                    />
                    {errors.time?.type === 'required' && (
                      <p className='text-red-500'>
                        Selecciona la hora en la que deseas viajar
                      </p>
                    )}
                  </div>
                ) : (
                  <div className='mb-6'>
                    <label className='block mb-2 text-sm text-gray-600'>
                      Fecha y hora del viaje
                    </label>
                    <input
                      type='datetime-local'
                      id='datetime-local'
                      className='w-full bg-transparent ring-2 ring-gray-300 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500'
                      required
                      {...register('datetime-local', {
                        required: true,
                        value: getCurrentDateTime(),
                      })}
                    />
                    {errors.time?.type === 'required' && (
                      <p className='text-red-500'>
                        Selecciona la fecha y hora en la que deseas viajar
                      </p>
                    )}
                  </div>
                )}
                <div className='w-full mb-6 inline-flex items-center'>
                  <input
                    type='checkbox'
                    id='pet'
                    className='form-checkbox w-16'
                    {...register('pet', { required: false, value: true })}
                  />
                  <label className='ml-2'>Viajo con mi mascota</label>
                </div>
                <div className='w-full mb-6 inline-flex items-center'>
                  <input
                    type='checkbox'
                    id='suitcase'
                    className='form-checkbox w-16'
                    {...register('suitcase', { required: false, value: true })}
                  />
                  <label className='ml-2'>Viajo con maletas</label>
                </div>
                <button
                  onClick={handleSubmit(onSubmit)}
                  type='submit'
                  className='my-8 w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-2 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400'
                >
                  Solicitar servicio
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CrearSolicitud;
