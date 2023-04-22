package com.unquiler.beunquiler.services

import com.unquiler.beunquiler.repositories.entities.User

interface UserService {
    fun register(user: User): User

    fun login(user: User): User
}