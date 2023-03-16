const searchParams = new URLSearchParams( window.location.search )

if( !searchParams.has('escritorio') ) {
    setTimeout(() => {
        window.location = 'index.html'
    }, 2000);
    throw new Error('Es escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio')
console.log('Este escritorio: ', escritorio)
$('#nombreEscritorio').html(escritorio)
$('#serverMessage').css("display", "none")
$('#lblPendientes').css("display", "none")

const socket = io()

socket.on('connect', () => {
    console.log('conectado');
    $('#btnAtenderTicket').attr("disabled", false)
})

socket.on('disconnect', () => {
    console.log('Desconectado!');
    $('#btnAtenderTicket').attr("disabled", true)
})

socket.on('ultimo-ticket', numTicket => {
    console.log('ultimo Ticket:', numTicket);

})

socket.on('siguiente-ticket', numTicket => {
    console.log('siguiente Ticket:', numTicket);

})

socket.on('tickets-por-atender', numTickets => {
    console.log('Ticket x atender:', numTickets);
    $('#lblPendientes').css("display", "block")
    $('#serverMessage').css("display", "none")
    $('#lblPendientes').html(numTickets)
})

socket.on('atender-ticket', ticket => {
    console.log('Ticket en atention:', ticket);
})


$('#btnAtenderTicket').on('click', () => {

    // emitir 
    socket.emit('atender-ticket', { escritorio }, ( { ok, ticket, message } ) => {
        
        console.log('ok', ok )
        
        if( !ok ) {
            console.log('message', message )
            $('#serverMessage').css("display", "block")
            $('#lblPendientes').css("display", "none")
            $('#serverMessage span').html(message);
        } else {
            $('#serverMessage').css("display", "none")
            $('#lblPendientes').css("display", "block")
            $('#numeroTicket').html(ticket.numero)
            console.log('ticket', ticket )
        }

    })

})