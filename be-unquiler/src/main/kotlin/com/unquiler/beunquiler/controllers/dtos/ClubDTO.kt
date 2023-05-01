package com.unquiler.beunquiler.controllers.dtos

data class ClubDTO(
    val id: Long,
    val email: String,
    val nombreClub: String,
    val direccion: String,
    val canchas: List<CanchaDTO>
)