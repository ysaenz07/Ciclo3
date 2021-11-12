//import { useDarkMode } from 'context/darkMode';
import React from 'react';


const Admin = () => {
  //const { darkMode } = useDarkMode();
  return(
  <>
    <div className="flex h-full w-full flex-col-3 items-center justify-start p-8">
      <div className="flex flex-col w-full">
        <h2 className="text-3xl font-extrabold text-gray-900 justify-center" >
          Bienvenido 
        </h2>
      </div>    
    </div>
  </>
  );
};

export default Admin;