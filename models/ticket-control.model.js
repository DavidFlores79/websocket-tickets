const path = require('path')
const fs = require('fs')

class Ticket {
    constructor( numero, escritorio ) {
        this.numero = numero
        this.escritorio = escritorio
    }
}

class TicketControl {


    constructor() {
        this.ultimo = 0
        this.hoy = new Date().getDate()
        this.tickets = []
        this.ultimosCuatro = []

        this.init()
    }

    get toJSON() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuatro: this.ultimosCuatro
        }
    }

    init() {
        const { ultimo, hoy, tickets, ultimosCuatro } = require('../db/data.json')
        if( hoy === this.hoy ) {
            this.ticket = tickets
            this.ultimo = ultimo
            this.ultimosCuatro = ultimosCuatro
        } else {
            this.guardarDB()
        }
        console.log(hoy);
    }

    guardarDB() {
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJSON))
    }

    siguiente() {
        this.ultimo += 1;
        const ticket = new Ticket(this.ultimo, null)
        this.tickets.push( ticket )
        this.guardarDB()
        return `Ticket ${ticket.numero}`
    }

    atenderTicket(escritorio) {
        console.log(this.tickets.length);

        //si no tenemos tickets
        if( this.tickets.length === 0 ) {
            return null
        } 

        const ticket = this.tickets.shift() //elimina el primer ticket del arreglo y lo asigna a la variable

        ticket.escritorio = escritorio; //asignamos al ticket el escritorio enviado como parametro

        this.ultimosCuatro.unshift( ticket ) //añadir el nuevo ticket al principio

        if( this.ultimosCuatro.length > 4 ) {
            this.ultimosCuatro.splice(-1, 1);
        }

        console.log('Ultimos cuatro: ', this.ultimosCuatro);

        this.guardarDB() //guardar en la BD

        return ticket
    }



}


module.exports = TicketControl