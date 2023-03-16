console.log('Nuevo Ticket HTML');

const socket = io()

socket.on('connect', () => {
    console.log('conectado');
    $('#btnNuevoTicket').attr("disabled", false);
})

socket.on('disconnect', () => {

    console.log('Desconectado!');
    $('#btnNuevoTicket').attr("disabled", true);

})

socket.on('ultimo-ticket', numTicket => {
    console.log('ultimo Ticket:', numTicket);
    $('#lblNuevoTicket').html(`Ticket ${numTicket}`)
})

socket.on('tickets-por-atender', numTickets => {
    console.log('Ticket x atender:', numTickets);
})

$('#btnNuevoTicket').on('click', () => {

    let payload = {
        message: $('#textMessage').val(),
        fecha: new Date().getTime()
    }
    // console.log('Texto a enviar: ', payload);

    // socket.emit('client-message', payload)
    socket.emit('siguiente-ticket', payload, ( ticket ) => {
        console.log('id desde server', ticket)
        $('#lblNuevoTicket').html(ticket)
    })

})