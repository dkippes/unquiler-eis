package com.unquiler.beunquiler.services

import com.unquiler.beunquiler.repositories.entities.Cancha
import java.util.Optional

interface CanchaService {
    fun getByClubName(clubName:String):Array<Cancha>
    fun getLastCanchas(qty: Int, inicio: String?, fin: String?): Array<Cancha>
    fun getDetails(idCancha:Long): Optional<Cancha>
}
