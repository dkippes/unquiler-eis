package com.unquiler.beunquiler.repositories.dao

import com.unquiler.beunquiler.repositories.entities.Cancha
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CanchaRepository : JpaRepository<Cancha, Long> {

}