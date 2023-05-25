package com.unquiler.beunquiler.services

import com.unquiler.beunquiler.repositories.entities.Horario
import com.unquiler.beunquiler.repositories.entities.User
import com.unquiler.beunquiler.services.impl.ReservaDTO

interface UserService {
    fun register(user: User): User
    fun login(user: User): User
    fun alquilarCancha(idUsuario: Long, idCancha: Long, fecha: String, horario: Horario)
    fun reservas(idUsuario: Long): List<ReservaDTO>
}