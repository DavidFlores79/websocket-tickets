const socketController = (socket) => { 
    // console.log(`Cliente conectado ${socket.id}`);

    socket.on('disconnect', () => {
      console.log('cliente desconectado', socket.id);
    })

    //escuchar mensajes de los clientes
    socket.on('client-message', (payload, callback) => {

      console.log('mensaje del cliente', payload);

      //TODO: guardar en BD

      //enviar el id de resultado al q envio el mensaje
      const id = '6546846384'
      callback({ id, fecha: new Date() })



      //emitir ese mensaje a todos los clientes conectados
      socket.broadcast.emit('client-message', payload)
    })
  }


module.exports = { socketController }