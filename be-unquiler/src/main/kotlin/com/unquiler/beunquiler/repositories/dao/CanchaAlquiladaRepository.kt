package com.unquiler.beunquiler.repositories.dao

import com.unquiler.beunquiler.repositories.entities.CanchaAlquilada
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CanchaAlquiladaRepository : JpaRepository<CanchaAlquilada, Long> {

    fun findAllByCanchaClubId(clubId: Long): List<CanchaAlquilada>
}