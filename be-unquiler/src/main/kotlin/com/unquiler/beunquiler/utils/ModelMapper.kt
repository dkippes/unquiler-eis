package com.unquiler.beunquiler.utils

import com.unquiler.beunquiler.controllers.dtos.*
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
        return Club(clubRequestDto.getEmail(), clubRequestDto.getNombreClub(), clubRequestDto.getDireccion(), clubRequestDto.getPassword(),clubRequestDto.getUrlImagen())
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
        return ClubDTO(club.getId()!!,club.getEmail()!!, club.getNombreClub()!!,club.getDireccion()!!,club.getCanchas()!!.map { CanchaDTO(it.id!!, it.nombre!!, it.capacidad, it.deporte!!.value, it.precio, it.horariosDisponibles) }.toList(),
            club.getUrlImagen()!!
        )
    }

    fun toDto(user: User): UserDTO {
        return UserDTO(user.getId()!!,user.getEmail()!!, user.getPassword()!!)
    }

    fun toDtoSinCanchas(club: Club): ClubDTOSinCanchas {
        return ClubDTOSinCanchas(club.getId()!!,club.getEmail()!!, club.getNombreClub()!!,club.getDireccion()!!, club.getUrlImagen()!!)
    }

    fun toDtoSinHorarios(cancha: Cancha, club_id: Long?): CanchaDTOSinHorarios {
        return CanchaDTOSinHorarios(
            id = cancha.id,
            nombre = cancha.nombre!!,
            capacidad = cancha.capacidad,
            deporte = cancha.deporte?.value!!,
            precio = cancha.precio,
            club_id = club_id
        )
    }

    fun toDto(cancha: Cancha): CanchaDTO {
        return CanchaDTO(
            cancha.id,
            cancha.nombre!!,
            cancha.capacidad,
            cancha.deporte?.value!!,
            cancha.precio,
            cancha.horariosDisponibles
        )
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