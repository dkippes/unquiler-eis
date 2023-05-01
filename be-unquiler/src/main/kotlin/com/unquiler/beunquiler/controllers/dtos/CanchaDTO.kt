package com.unquiler.beunquiler.controllers.dtos

import com.fasterxml.jackson.annotation.JsonFormat
import com.unquiler.beunquiler.repositories.entities.Horario

data class CanchaDTO(
    val id: Long?,
    val nombre: String,
    val capacidad: Int,
    val deporte: String,
    val precio: Double,
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    val horariosDisponibles: Map<String, MutableSet<Horario>>
)