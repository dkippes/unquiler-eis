package com.unquiler.beunquiler.repositories.dao

import com.unquiler.beunquiler.repositories.entities.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import java.util.Optional

@Repository
interface UserRepository : JpaRepository<User, Long> {
    fun existsUserByEmail(email: String): Boolean
    fun findByEmailAndPassword(email: String, password: String): Optional<User>

    @Query(
        value = "DELETE FROM canchas_alquiladas ca WHERE ca.id = ?1;",
        nativeQuery = true)
    fun cancelarReserva(idReserva: Long): Void
}