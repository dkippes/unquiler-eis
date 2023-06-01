package com.unquiler.beunquiler.repositories.entities

import jakarta.persistence.CascadeType
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

    @ManyToOne(cascade = [CascadeType.ALL])
    @JoinColumn(name = "user_id")
    var usuario: User? = null

    @ManyToOne(cascade = [CascadeType.ALL])
    @JoinColumn(name = "cancha_id")
    var cancha: Cancha? = null

    var fecha: String? = null

    var horario: Horario? = null

    var pagado: Boolean? = null

    constructor(cancha: Cancha, fecha: String, horario: Horario, usuario: User, pagado: Boolean) : this() {
        this.cancha = cancha
        this.fecha = fecha
        this.horario = horario
        this.usuario = usuario
        this.pagado = pagado

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

    fun cancelarReserva(fecha: String, horario: Horario) {
        cancha?.horariosDisponibles?.get(fecha)?.let { horariosFecha ->
            horariosFecha.find { it.hora == horario?.hora }?.disponible = true
        }
    }
}