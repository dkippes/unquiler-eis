package com.unquiler.beunquiler.utils

import com.unquiler.beunquiler.controllers.dtos.CanchaDTO
import com.unquiler.beunquiler.controllers.dtos.ClubDTO
import com.unquiler.beunquiler.controllers.dtos.ClubRequestDto
import com.unquiler.beunquiler.controllers.dtos.UserRequestDto
import com.unquiler.beunquiler.repositories.entities.Cancha
import com.unquiler.beunquiler.repositories.entities.Club
import com.unquiler.beunquiler.repositories.entities.User
import com.unquiler.beunquiler.repositories.enums.Deportes
import org.springframework.stereotype.Component

@Component
class ModelMapper {
    fun toEntity(userRequestDto: UserRequestDto): User {
        return User(userRequestDto.getEmail(), userRequestDto.getPassword())
    }

    fun toEntity(clubRequestDto: ClubRequestDto): Club {
        return Club(clubRequestDto.getEmail(), clubRequestDto.getNombreClub(), clubRequestDto.getDireccion(), clubRequestDto.getPassword())
    }

    fun toEntity(canchaDto: CanchaDTO): Cancha {
        val horariosDisponibles = canchaDto.horariosDisponibles.mapValues { it.value }.toMutableMap()
        println(Deportes.valueOf(canchaDto.deporte))
        return Cancha(
            null,
            canchaDto.nombre,
            canchaDto.capacidad,
            Deportes.valueOf(canchaDto.deporte),
            canchaDto.precio,
            horariosDisponibles
        )
    }

    fun toDto(club: Club): ClubDTO {
        return ClubDTO(club.getId()!!,club.getEmail()!!, club.getNombreClub()!!,club.getDireccion()!!,club.getCanchas()!!.map { CanchaDTO(it.id!!, it.nombre!!, it.capacidad, it.deporte!!.value, it.precio, it.horariosDisponibles) }.toList() )
    }
    companion object {
        private var instance: ModelMapper? = null
        fun getInstance(): ModelMapper {
            if (instance == null) {
                instance = ModelMapper()
            }
            return instance!!
        }
    }
}