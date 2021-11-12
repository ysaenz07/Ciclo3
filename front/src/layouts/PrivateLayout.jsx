import Sidebar from 'components/Sidebar';
import React, { useEffect, useState } from 'react';
import SidebarResponsive from 'components/SidebarResponsive';
import { useAuth0 } from '@auth0/auth0-react';
import ReactLoading from 'react-loading';

//import { obtenerDatosUsuario } from 'utils/api';
//import { useUser } from 'context/userContext';
import { obtenerDatosUsuario } from 'utils/api';
import { useUser } from 'context/userContext';

const PrivateLayout = ({ children }) => {
  
  const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently, logout } = useAuth0();
  const [loadingUserInfotmation,setLoadingUserInfotmation]= useState(false);
  const {setUserData}=useUser();
  useEffect(() => {

    const fetchAuth0Token = async () => {

      setLoadingUserInfotmation(true);
      //1. pedir token a auth0
      const accessToken= await getAccessTokenSilently({
        audience: 'ApiCiclo',
      });
      //2. recibir token de auth0
      localStorage.setItem('token', accessToken);
      console.log(accessToken);
      //3. enviarle el token al backen
      await obtenerDatosUsuario(
        (response)=>{
          console.log('response', response);
          setUserData(response.data);
          setLoadingUserInfotmation(false);
        },
        (err)=>{
          console.log('err', err);
          setLoadingUserInfotmation(false);
          logout({ returnTo: 'https://glacial-ridge-39017.herokuapp.com/admin' });
        }
      );
    };
    if (isAuthenticated) {
      fetchAuth0Token();
    }
  }, [isAuthenticated, getAccessTokenSilently, logout, setUserData]);

  if (isLoading || loadingUserInfotmation) 
    return <ReactLoading type='cylon' color='#abc123' height={667} width={375} />;

  if (!isAuthenticated) {
  return loginWithRedirect();
  }
  
  return (
      <div className='flex w-screen h-screen'>
        <div className='flex flex-col lg:flex-row bg-gray-500 flex-nowrap h-full w-full'>
          <Sidebar />
          <SidebarResponsive />
          <main className='flex w-full  overflow-y-scroll items-center justify-center'>
            {children}
          </main>
        </div>
      </div>
  );
};

export default PrivateLayout;
