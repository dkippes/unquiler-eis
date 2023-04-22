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

    fun setPassword(password: String) {
        this.password = password
    }
}