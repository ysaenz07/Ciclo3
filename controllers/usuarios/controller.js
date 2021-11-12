import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';
import jwt_decode from 'jwt-decode';

const queryAllUsers = async (callback) => {
  const baseDeDatos = getDB();
  console.log('query');
  await baseDeDatos.collection('usuario').find({}).limit(50).toArray(callback);
};

const crearUsuario = async (datosUsuario, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuario').insertOne(datosUsuario, callback);
};

const consultarUsuario = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuario').findOne({ _id: new ObjectId(id) }, callback);
};

const consultarOCrearUsuario = async (req, callback)=>{
  // 6.1. obtener los datos del usuario desde el token
  const token = req.headers.authorization.split('Bearer ')[1];
  const user = jwt_decode(token)['http://localhost/userData'];
  
  console.log('token', jwt_decode(token));
  // 6.2. con el correo del usario o con el id del auth0, verificar si el usario ya esta en la bd o no
  const baseDeDatos=getDB();
  await baseDeDatos.collection('usuario').findOne({email:user.email}, async (err, response)=>{
    console.log('respuesta de la base de datos',response);
    if (response){
    // 7.1. si el usuario ya esya en la BD devuelve la info del usuario
      callback(err,response);
    }else{
    // 7.2. si el usuario no esta en la bd, lo crea y devuelve la info
    // modifico el nombre del campo id para que sea diferente al que crea la base de datos
      user.auth0ID=user._id
      delete user._id;
      user.rol="Sin rol";
      user.estado='pendiente';
      await crearUsuario(user,(err,respuesta)=> callback(err,user));
    }
  });
 
}


const editarUsuario = async (id, edicion, callback) => {
  const filtroUsuario = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('usuario')
    .findOneAndUpdate(filtroUsuario, operacion, { upsert: true, returnOriginal: true }, callback);
};

const eliminarUsuario = async (id, callback) => {
  const filtroUsuario = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('usuario').deleteOne(filtroUsuario, callback);
};

export { 
  queryAllUsers, 
  crearUsuario, 
  consultarUsuario, 
  editarUsuario, 
  eliminarUsuario,
  consultarOCrearUsuario,
};
