console.log('Publico HTML');

const socket = io()

socket.on('connect', () => {
    console.log('conectado');

})

socket.on('disconnect', () => {
    console.log('Desconectado!');
})

socket.on('ultimo-ticket', numTicket => {
    console.log('ultimo Ticket:', numTicket);

})

socket.on('siguiente-ticket', numTicket => {
    console.log('siguiente Ticket:', numTicket);

})

socket.on('estado-actual', ultimosCuatro => {
    console.log('ultimos cuatro', ultimosCuatro);

    const audio = new Audio('./audio/new-ticket.mp3')
    audio.play()

    const [ticket1, ticket2, ticket3, ticket4] = ultimosCuatro


    if(ticket1) {
        $('#lblTicket1').html(ticket1.numero)
        $('#lblEscritorio1').html(ticket1.escritorio)
    }
    if(ticket2) {
        $('#lblTicket2').html(ticket2.numero)
        $('#lblEscritorio2').html(ticket2.escritorio)
    }
    if(ticket3) {
        $('#lblTicket3').html(ticket3.numero)
        $('#lblEscritorio3').html(ticket3.escritorio)
    }
    if(ticket4) {
        $('#lblTicket4').html(ticket4.numero)
        $('#lblEscritorio4').html(ticket4.escritorio)
    }

})
