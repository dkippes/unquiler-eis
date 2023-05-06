package com.unquiler.beunquiler.controllers.dtos

data class CanchaDTOSinHorarios(
    val id: Long?,
    val nombre: String,
    val capacidad: Int,
    val deporte: String,
    val precio: Double,
    val club_id: Long?
)