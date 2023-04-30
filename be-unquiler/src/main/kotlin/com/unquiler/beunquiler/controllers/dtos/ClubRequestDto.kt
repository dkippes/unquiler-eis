package com.unquiler.beunquiler.controllers.dtos

import jakarta.validation.constraints.NotNull

class UserRequestDto {
    @NotNull
    private var email: String
    @NotNull
    private var password: String

    constructor(email: String, password: String) {
        this.email = email
        this.password = password
    }

    fun getEmail(): String {
        return email
    }

    fun getPassword(): String {
        return password
    }
}