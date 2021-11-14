//import { ObjectId } from 'mongodb';
import { getDB } from '../db/db.js';
import jwt_decode from 'jwt-decode';

const autorizacionEstadoUsuario=async (req,res,next)=>{
    // paso 1: obtener el usuario desde el token    console.log('Soy un middleware');
    const token = req.headers.authorization.split('Bearer ')[1];
    const user = jwt_decode(token)['http://localhost/userData'];
    //console.log('token', jwt_decode(token));
   
    // paso 2. consultar el usuario en la bd
    const baseDeDatos=getDB();
    await baseDeDatos.collection('usuario').findOne({email:user.email}, async (err, response)=>{
      if (response){
        console.log(response);
        // paso 3: verificar el estado del usuario
        if(response.estado==="rechazado"){
            // paso 4: si el usuario es rechazado, devolver un error de autenticacion    
            res.sendStatus(401);
            res.end();
        }
        else{
           // paso 5: si el usuario esta pendiente o habilitado, ejecutar next()
           console.log('habilitado')
           next();
        }   
      }else{
        next();
      }
    });     
};

export default autorizacionEstadoUsuario;