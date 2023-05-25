package com.unquiler.beunquiler.repositories.entities

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table

@Entity
@Table(name = "canchas_alquiladas")
class CanchaAlquilada() {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @ManyToOne
    @JoinColumn(name = "user_id")
    var usuario: User? = null

    @ManyToOne
    @JoinColumn(name = "cancha_id")
    var cancha: Cancha? = null

    var fecha: String? = null

    var horario: Horario? = null

    constructor(cancha: Cancha, fecha: String, horario: Horario, usuario: User) : this() {
        this.cancha = cancha
        this.fecha = fecha
        this.horario = horario
        this.usuario = usuario

        alquilada()
    }

    private fun alquilada() {
        val horarios = this.cancha!!.horariosDisponibles[this.fecha!!]

        val horarioTomado = horarios!!.any { it.hora == this.horario!!.hora && !it.disponible }

        if (horarioTomado) throw RuntimeException("La cancha ya esta alquilada a ese horario")

        horarios.removeIf {it.hora == this.horario!!.hora}
        horarios.add(this.horario!!.apply { this.disponible = false})

        this.cancha!!.horariosDisponibles[this.fecha!!] = horarios
    }

    // Resto de propiedades y métodos de la clase CanchaAlquilada
}