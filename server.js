// hacer el import de express tradicional
// const express = require('express');

// hacer el nuevo import
import Express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
import { conectarBD } from './db/db.js';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

import rutasUsuario from './views/usuarios/rutas.js';
import rutasProducto from './views/productos/rutas.js';
import rutasVenta from './views/ventas/rutas.js';
import autorizacionEstadoUsuario from './middleware/autorizacionEstado.js';

dotenv.config({ path: './.env' });

const port =process.env.PORT || 5000;

const app = Express();

app.use(Express.json());
app.use(Cors());
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-02kgb3cy.us.auth0.com/.well-known/jwks.json'

}),
audience: 'ApiCiclo',
issuer: 'https://dev-02kgb3cy.us.auth0.com/',
algorithms: ['RS256']
});

//4 y 5: enviarle el token a auth0 para que verifique si es valido
//usuario id: aKq6oCe4aw99jLOzyohEVbhtlFxdIuPP

app.use(jwtCheck);
app.use(autorizacionEstadoUsuario);
app.use(rutasUsuario);
app.use(rutasProducto);
app.use(rutasVenta);


const main = () => {
  return app.listen(port, () => {
    console.log(`escuchando puerto ${port}`);
  });
};

conectarBD(main);
