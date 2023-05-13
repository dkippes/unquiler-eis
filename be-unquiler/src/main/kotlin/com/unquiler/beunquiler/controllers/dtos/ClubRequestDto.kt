package com.unquiler.beunquiler.controllers.dtos

import jakarta.validation.constraints.NotNull

class ClubRequestDto {


    @NotNull
    private var email: String
    @NotNull
    private var nombreClub: String
    @NotNull
    private var direccion: String
    @NotNull
    private var password: String

    private val imagenUrl: String
    constructor(email: String, nombreClub: String, direccion: String, password: String, imagenUrl : String){
        this.email = email
        this.nombreClub = nombreClub
        this.direccion = direccion
        this.password = password
        this.imagenUrl = imagenUrl
    }

    fun getEmail(): String {
        return email
    }

    fun getNombreClub(): String {
        return nombreClub
    }

    fun getPassword(): String {
        return password
    }

    fun getDireccion(): String {
        return direccion
    }

    fun getImagenUrl(): String {
        return imagenUrl
    }
}