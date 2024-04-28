import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
// import sideImg from '../../public/assets/images/side-img.svg'

const AuthLayout = () => {
  const isAuth = false; // Replace this with your actual authentication logic

  return (
    <>
      {isAuth ? (
        <Navigate to="/" />
      ) : (
        <>
        <section className='flex flex-1 justify-center items-center flex-col py-10'>
          <Outlet />
        </section>
        {/* <img src='../../public/assets/images/side-img.svg'
        alt='logo'
        className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"/> */}
        </>
      )}
    </>
  );
};

export default AuthLayout;
