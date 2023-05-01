package com.unquiler.beunquiler.repositories.entities

import jakarta.persistence.*
import jakarta.validation.constraints.NotNull

@Entity
@Table(name = "clubs")
class Club() {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private var id: Long? = null
    @Column(unique = true)
    private var email: String? = null
    private var nombreClub: String? = null
    private var direccion: String? = null
    private var password: String? = null
    @OneToMany(cascade = [CascadeType.ALL], mappedBy = "club")
    private var canchas: MutableSet<Cancha>? = null

    constructor(email: String, nombreClub: String, direccion: String, password: String) : this() {
        this.email = email
        this.nombreClub = nombreClub
        this.direccion = direccion
        this.password = password
        this.canchas = mutableSetOf()
    }

    fun getId(): Long? {
        return id
    }

    fun getEmail(): String? {
        return email
    }

    fun getNombreClub(): String? {
        return nombreClub
    }

    fun getPassword(): String? {
        return password
    }

    fun getDireccion(): String? {
        return direccion
    }

    fun setPassword(password: String) {
        this.password = password
    }

    fun getCanchas(): MutableSet<Cancha>? {
        return this.canchas
    }

    fun registrarCancha(cancha: Cancha) {
        cancha.club = this
        canchas?.add(cancha)
    }
}