package com.unquiler.beunquiler.repositories.dao

import com.unquiler.beunquiler.repositories.entities.CanchaAlquilada
import jakarta.transaction.Transactional
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface CanchaAlquiladaRepository : JpaRepository<CanchaAlquilada, Long> {
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM canchas_alquiladas ca WHERE ca.id = ?1", nativeQuery = true)
    fun cancelarReserva(idReserva: Long)

    fun findAllByCanchaClubId(clubId: Long): List<CanchaAlquilada>
}