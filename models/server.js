const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //conectar a DB
    // this.conectarDB();

    //middlewares
    this.middlewares();

    //rutas de mi aplicacion
    this.routes();
  }

  middlewares() {
    //directorio public
    this.app.use(express.static('public'));

    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(
      bodyParser.json({
        limit: '20mb',
      })
    );
    this.app.use(
      bodyParser.urlencoded({
        limit: '20mb',
        extended: true,
      })
    );

  }

//   async conectarDB() {
//     await dbConnection();
//   }

  routes() {
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`WebsocketServer listo en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
