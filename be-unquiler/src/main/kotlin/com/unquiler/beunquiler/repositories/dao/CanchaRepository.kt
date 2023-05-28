package com.unquiler.beunquiler.repositories.dao

import com.unquiler.beunquiler.repositories.entities.Cancha
import com.unquiler.beunquiler.repositories.entities.Horario
import jakarta.transaction.Transactional
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import java.time.LocalTime

@Repository
interface CanchaRepository : JpaRepository<Cancha, Long> {
    @Query(
        value = "SELECT ca.* FROM canchas ca " +
                "inner join clubs cl on ca.club_id = cl.id" +
                " where cl.nombre_club like %?1% ",
        nativeQuery = true)
    fun findByClubName(clubName: String): Array<Cancha>

    @Query(
        value = "SELECT *  FROM canchas " +
                " order by id DESC LIMIT 0, ?1 ",
        nativeQuery = true)
    fun getLastCanchas(qty: Long): Array<Cancha>

    @Modifying
    @Transactional
    @Query(
        value = "UPDATE horarios_disponibles " +
                "SET disponible = true " +
                "WHERE cancha_id = ?1 " +
                "AND fecha = ?2 " +
                "AND hora = ?3",
        nativeQuery = true
    )
    fun setHorarioDisponible(canchaId: Long, fecha: String, hora: LocalTime): Int

    @Query("SELECT c FROM Cancha c JOIN c.horariosDisponibles hd WHERE c.id = :idCancha AND KEY(hd) = :fecha")
    fun findByIdAndFecha(@Param("idCancha") idCancha: Long, @Param("fecha") fecha: String): Cancha?
}
