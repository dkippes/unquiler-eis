package com.unquiler.beunquiler.repositories.entities

import jakarta.persistence.*


@Entity
@Table(name = "users")
class User() {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private var id: Long? = null
    @Column(unique = true)
    private var email: String? = null
    private var password: String? = null

    @OneToMany(cascade = [CascadeType.ALL], mappedBy = "usuario")
    private var reservas: MutableSet<CanchaAlquilada> = mutableSetOf()

    constructor(email: String, password: String) : this() {
        this.email = email
        this.password = password
    }

    fun getId(): Long? {
        return id
    }

    fun getEmail(): String? {
        return email
    }

    fun getPassword(): String? {
        return password
    }

    fun getReservas(): MutableSet<CanchaAlquilada> {
        return reservas
    }

    fun setPassword(password: String) {
        this.password = password
    }

    fun setReservas(reservas: MutableSet<CanchaAlquilada>) {
        this.reservas = reservas
    }

    fun alquilar(cancha: Cancha, fecha: String, horario: Horario){
        this.reservas.add(CanchaAlquilada(cancha, fecha, horario, this))
    }
}