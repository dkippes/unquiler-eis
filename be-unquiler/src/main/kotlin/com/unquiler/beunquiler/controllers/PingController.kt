package com.unquiler.beunquiler.controllers

import com.unquiler.beunquiler.repositories.entities.User
import com.unquiler.beunquiler.services.UserService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class PingController(var userService: UserService) {

    @GetMapping("/ping")
    fun ping() = "pong"

    @GetMapping("/test")
    fun test() {
        userService.register(User())
    }
}