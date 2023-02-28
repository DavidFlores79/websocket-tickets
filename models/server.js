const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { socketController } = require('../sockets/controller');


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.server = require('http').createServer( this.app );

    this.io = require('socket.io')( this.server );

    // io.on('connection', () => {});
    // server.listen(3000);



    //conectar a DB
    // this.conectarDB();

    //middlewares
    this.middlewares();

    //rutas de mi aplicacion
    this.routes();

    //Eventos de Sockets
    this.sockets();
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

  sockets() {
    this.io.on('connection', socketController);
  }

  listen() {
    // levantar el server no el app
    this.server.listen(this.port, () => {
      console.log(`WebsocketServer listo en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
