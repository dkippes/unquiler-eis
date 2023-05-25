package com.unquiler.beunquiler.services

import com.unquiler.beunquiler.repositories.entities.Cancha
import com.unquiler.beunquiler.repositories.entities.Horario
import java.util.Optional

interface CanchaService {
    fun getByClubName(clubName:String):Array<Cancha>
    fun getLastCanchas(qty: Int): Array<Cancha>
    fun getDetails(idCancha:Long): Optional<Cancha>
}
