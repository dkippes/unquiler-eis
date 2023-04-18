package com.unquiler.beunquiler.controllers.dtos

import jakarta.validation.constraints.NotNull

class UserRequestDto {
    @NotNull
    private var username: String
    @NotNull
    private var password: String

    constructor(username: String, password: String) {
        this.username = username
        this.password = password
    }

    fun getUsername(): String {
        return username
    }

    fun getPassword(): String {
        return password
    }
}