package com.unquiler.beunquiler.repositories.entities

import jakarta.persistence.*

@Entity
@Table(name = "users")
class User() {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private var id: Long? = null
    private var username: String? = null
    private var password: String? = null

    constructor(username: String, password: String) : this() {
        this.username = username
        this.password = password
    }

    fun getId(): Long? {
        return id
    }

    fun getUsername(): String? {
        return username
    }

    fun getPassword(): String? {
        return password
    }

    fun setPassword(password: String) {
        this.password = password
    }
}