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

    @Query("SELECT * FROM canchas c WHERE (?2 IS NULL OR NOT EXISTS (SELECT hd.fecha FROM horarios_disponibles hd WHERE hd.cancha_id = c.id AND STR_TO_DATE(hd.fecha, '%Y-%m-%d') < STR_TO_DATE(?2, '%Y-%m-%d'))) " +
            "AND (?3 IS NULL OR NOT EXISTS (SELECT hd.fecha FROM horarios_disponibles hd WHERE hd.cancha_id = c.id AND STR_TO_DATE(hd.fecha, '%Y-%m-%d') > STR_TO_DATE(?3, '%Y-%m-%d'))) " +
            "ORDER BY c.id DESC LIMIT ?1", nativeQuery = true)
    fun getLastCanchas(@Param("qty") qty: Long,
                       @Param("from") from: String?,
                       @Param("to") to: String?): Array<Cancha>

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
