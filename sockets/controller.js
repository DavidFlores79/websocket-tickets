const TicketControl = require("../models/ticket-control.model");

const ticketControl = new TicketControl()


const socketController = (socket) => { 

    socket.emit('ultimo-ticket', ticketControl.ultimo)
    socket.emit('tickets-por-atender', ticketControl.tickets.length)
    socket.emit('estado-actual', ticketControl.ultimosCuatro)

    socket.on('siguiente-ticket',  (payload, callback) => {

      const siguienteTicket = ticketControl.siguiente()
      callback( siguienteTicket )

      //TODO: Notificar q hay un nuevo ticket pendiente de asignar
      socket.broadcast.emit('tickets-por-atender', ticketControl.tickets.length)
      socket.broadcast.emit('ultimo-ticket', ticketControl.ultimo)
    })

    //desestructurar el escritorio
    socket.on('atender-ticket', ({ escritorio }, callback) => {

      if(!escritorio) {
        return callback({
          ok: false,
          message: 'El escritorio es obligatorio al atender un ticket'
        })
      }
      console.log('escritorio', escritorio);

      const ticket = ticketControl.atenderTicket(escritorio)
      console.log('ticket para atender', ticket);

      if(!ticket) {
        return callback({
          ok: false,
          message: 'Ya no hay tickets pendientes'
        })
      } else {
        socket.emit('tickets-por-atender', ticketControl.tickets.length)
        socket.broadcast.emit('tickets-por-atender', ticketControl.tickets.length)
        socket.broadcast.emit('estado-actual', ticketControl.ultimosCuatro)
        return callback({
          ok: true,
          ticket
        })
      }
      
    })
  }


module.exports = { socketController }