package com.unquiler.beunquiler.repositories

import com.unquiler.beunquiler.repositories.entities.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : JpaRepository<User, Long?> {
}