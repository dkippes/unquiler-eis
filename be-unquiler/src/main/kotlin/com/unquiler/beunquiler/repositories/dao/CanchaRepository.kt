package com.unquiler.beunquiler.repositories.dao

import com.unquiler.beunquiler.repositories.entities.Cancha
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface CanchaRepository : JpaRepository<Cancha, Long> {
    @Query(
        value = "SELECT ca.* FROM canchas ca " +
                "inner join clubs cl on ca.club_id = cl.id" +
                " where cl.nombre_club like %?1% ",
        nativeQuery = true)
    fun findByClubName(clubName: String): Array<Cancha>

}