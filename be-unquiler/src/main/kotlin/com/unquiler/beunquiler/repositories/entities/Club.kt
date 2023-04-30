package com.unquiler.beunquiler.repositories.entities

import jakarta.persistence.*

@Entity
@Table(name = "clubs")
class Club() {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private var id: Long? = null
    @Column(unique = true)
    private var email: String? = null
    private var nombreClub: String? = null
    private var password: String? = null

    constructor(email: String, nombreClub: String, password: String) : this() {
        this.email = email
        this.nombreClub = nombreClub
        this.password = password
    }

    fun getId(): Long? {
        return id
    }

    fun getEmail(): String? {
        return email
    }

    fun nombreClub(): String? {
        return nombreClub
    }

    fun getPassword(): String? {
        return password
    }

    fun setPassword(password: String) {
        this.password = password
    }
}