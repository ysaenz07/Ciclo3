import React from 'react';
import { useUser } from 'context/userContext';


const PrivateRoute = ({ rolesList, children }) => {
  const { userData } = useUser();

  if (rolesList.includes(userData.rol)) {
    return children;
  }

  return <div className='text-5xl text-red-500'>No estás autorizado para ver este sitio</div>;
};

export default PrivateRoute;
