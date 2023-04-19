package com.unquiler.beunquiler.repositories.dao

import com.unquiler.beunquiler.repositories.entities.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : JpaRepository<User, Long> {
    fun existsUserByEmail(email: String): Boolean
}