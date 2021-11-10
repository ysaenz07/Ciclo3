import Express from 'express';
import { 
    queryAllProducts,
    crearProducto,
    consultarProducto,
    editarProducto,
    eliminarProducto 
  } from '../../controllers/productos/controller.js';

const rutasProducto = Express.Router();

const genercCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send('Error consultando los productos');
  } else {
    res.json(result);
  }
};

rutasProducto.route('/productos').get((req, res) => {
  console.log('se accedio a la ruta productos');
  queryAllProducts(genercCallback(res));
});

rutasProducto.route('/productos').post((req, res) => {
  crearProducto(req.body, genercCallback(res));
});

rutasProducto.route('/productos/:id').get((req, res) => {
  console.log('se accedio a la ruta productos');
  consultarProducto(req.params.id, genercCallback(res));
});

rutasProducto.route('/productos/:id').patch((req, res) => {
  editarProducto(req.params.id, req.body, genercCallback(res));
});

rutasProducto.route('/productos/:id').delete((req, res) => {
  eliminarProducto(req.params.id, genercCallback(res));
});

export default rutasProducto;
