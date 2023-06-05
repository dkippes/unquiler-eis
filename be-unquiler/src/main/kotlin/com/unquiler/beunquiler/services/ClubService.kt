package com.unquiler.beunquiler.services

import com.unquiler.beunquiler.controllers.dtos.ReservaClubDTO
import com.unquiler.beunquiler.repositories.entities.Cancha
import com.unquiler.beunquiler.repositories.entities.Club

interface ClubService {
    fun register(club: Club): Club
    fun login(email: String, password: String): Club

    fun publicarCancha(id:Long, cancha: Cancha): Cancha
    fun getClubInformation(id: Long): Club
    fun reservadas(idClub: Long) : List<ReservaClubDTO>
    fun marcarReservaPaga(idClub: Long,idReserva: Long): List<ReservaClubDTO>
}