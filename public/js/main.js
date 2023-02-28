console.log('hola mundo');

const socket = io()

socket.on('connect', () => {

    // console.log('conectado');
    $('.online').removeClass('d-none').addClass('d-block')
    $('.offline').removeClass('d-block').addClass('d-none')
})

socket.on('disconnect', () => {

    // console.log('Desconectado!');
    $('.offline').removeClass('d-none').addClass('d-block')
    $('.online').removeClass('d-block').addClass('d-none')
})

socket.on('client-message', msg => {
    console.log('mensaje recibido:', msg);
})

$('#btnMessage').on('click', () => {

    let payload = {
        message: $('#textMessage').val(),
        fecha: new Date().getTime()
    }
    // console.log('Texto a enviar: ', payload);

    // socket.emit('client-message', payload)
    socket.emit('client-message', payload, ( id ) => {
        console.log('id desde server', id);
    })

})