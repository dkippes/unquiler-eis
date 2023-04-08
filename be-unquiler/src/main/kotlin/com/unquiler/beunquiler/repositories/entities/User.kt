package com.unquiler.beunquiler.repositories.entities

import jakarta.persistence.*

@Entity
class User() {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private var id: Long? = null
}