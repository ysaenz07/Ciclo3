import axios from 'axios';

// const baseURL="http://localhost:5000"
const baseURL="https://agile-temple-49239.herokuapp.com" 
const getToken = () => {
  return `Bearer ${localStorage.getItem('token')}`;
};

//funcion para consultar los usuarios, se usa export para poderla usar en otros componentes
export const obtenerUsuarios = async (sucessCallback, errorCallback) => {
  const options = { 
    method: 'GET', 
    url:`${baseURL}/usuarios/`,
    headers: {
      Authorization: getToken(),
    },
  };
  await axios.request(options).then(sucessCallback).catch(errorCallback);
};

//obtener informacion del usuario que inicio sesion
export const obtenerDatosUsuario = async (successCallback, errorCallback) => {
  const options = {
    method: 'GET',
    url:`${baseURL}/usuarios/self/`,
    headers: {
      Authorization: getToken(), // 3. enviarle el token a backend
    },
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

//funcion para crear usuarios
export const crearUsuario= async (data,sucessCallback, errorCallback) =>{
  const options = { 
    method: 'POST',
    url:`${baseURL}/usuarios/`,
    headers: { 'Content-Type': 'application/json',Authorization: getToken() }, 
    data,
  };
    await axios.request(options).then(sucessCallback).catch(errorCallback);
};

//funcion para editar usuarios
export const editarUsuario= async (id, data, sucessCallback, errorCallback) =>{
   //enviar la info al backend
   const options = {
    method: 'PATCH',
    url: `${baseURL}/usuarios/${id}/`,
    headers: { 'Content-Type': 'application/json' ,Authorization: getToken()},
    data,
  };
    await axios.request(options).then(sucessCallback).catch(errorCallback);
};

//funcion para eliminar el usuario
export const deleteUsuario= async (id,sucessCallback, errorCallback) =>{
  //enviar la info al backend
  const options = {
    method: 'DELETE',
    url: `${baseURL}/usuarios/${id}/`,
    headers: { 'Content-Type': 'application/json',Authorization: getToken() },
 };
   await axios.request(options).then(sucessCallback).catch(errorCallback);
};

//********************************************************************* */

export const obtenerProductos = async (sucessCallback, errorCallback) => {
  const options = { 
    method: 'GET', 
    url:`${baseURL}/productos/`,
    headers: {
      Authorization: getToken(),
    },
  };
  await axios.request(options).then(sucessCallback).catch(errorCallback);
};

export const crearProducto= async (data,sucessCallback, errorCallback) =>{
  const options = { 
    method: 'POST',
    url:`${baseURL}/productos/`,
    headers: { 'Content-Type': 'application/json',Authorization: getToken() },
    data,
  };
    await axios.request(options).then(sucessCallback).catch(errorCallback);
};

//funcion para editar productos
export const editarProducto= async (id, data, sucessCallback, errorCallback) =>{
   //enviar la info al backend
   const options = {
    method: 'PATCH',
    url: `${baseURL}/productos/${id}/`,
    headers: { 'Content-Type': 'application/json',Authorization: getToken() },
    data,
  };
    await axios.request(options).then(sucessCallback).catch(errorCallback);
};

//funcion para eliminar producto
export const deleteProducto= async (id,sucessCallback, errorCallback) =>{
  //enviar la info al backend
  const options = {
    method: 'DELETE',
    url: `${baseURL}/productos/${id}/`,
    headers: { 'Content-Type': 'application/json', Authorization: getToken()},
 };
   await axios.request(options).then(sucessCallback).catch(errorCallback);
};


//**************************************************************************** */

export const crearVenta = async (data, successCallback, errorCallback) => {
  const options = {
    method: 'POST',
    url:`${baseURL}/ventas/`,
    headers: { 'Content-Type': 'application/json', Authorization: getToken() },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const deleteVenta= async (id,sucessCallback, errorCallback) =>{
  const options = {
    method: 'DELETE',
    url: `${baseURL}/ventas/${id}/`,
    headers: { 'Content-Type': 'application/json' ,
    Authorization: getToken(),},
 };
   await axios.request(options).then(sucessCallback).catch(errorCallback);
};

export const editarVenta= async (id, data, sucessCallback, errorCallback) =>{const options = {
  method: 'PATCH',
  url: `${baseURL}/ventas/${id}/`,
  headers: { 'Content-Type': 'application/json', 
  Authorization: getToken(),},
  data,
};
  await axios.request(options).then(sucessCallback).catch(errorCallback);
};

export const obtenerVentas = async (sucessCallback, errorCallback) => {
  const options = { method: 'GET', url:`${baseURL}/ventas/`, 
  headers: {
    Authorization: getToken(),
  },
 };
  await axios.request(options).then(sucessCallback).catch(errorCallback);
};


