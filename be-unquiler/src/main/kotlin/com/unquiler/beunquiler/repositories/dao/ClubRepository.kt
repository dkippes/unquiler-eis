package com.unquiler.beunquiler.repositories.dao

import com.unquiler.beunquiler.repositories.entities.Club
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface ClubRepository : JpaRepository<Club, Long> {
    fun existsClubByEmail(email: String): Boolean
    fun findByEmailAndPassword(email: String, password: String): Optional<Club>
}