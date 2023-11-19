import Link from 'next/link';

interface DynamicHeaderProps {
  title: string;
}

const DynamicHeader = (props: DynamicHeaderProps) => {
  return (
    <header className='w-full text-dark-700 bg-blue-600 border-t border-gray-100 shadow-sm body-font absolute top-0'>
      <div className='container px-3 flex items-center py-3 mx-auto md:flex-row justify-between'>
        <Link
          href='/servicios/usuario'
          className='flex items-center text-white my-auto font-medium  text-2xl title-font lg:items-center lg:justify-center'
        >
          SSMU
        </Link>

        <nav className='flex flex-wrap items-center text-base'>
          <div className='flex'>
            <div className='relative mx-3 w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'>
              <svg
                className='absolute w-12 h-12 text-gray-400 -left-1'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                  clip-rule='evenodd'
                ></path>
              </svg>
            </div>
            <Link
              href='#_'
              className='mx-0 my-auto font-medium text-white text-xl hover:text-gray-900'
            >
              Usuario
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default DynamicHeader;
