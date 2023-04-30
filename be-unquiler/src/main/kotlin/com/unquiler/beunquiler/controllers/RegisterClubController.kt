package com.unquiler.beunquiler.controllers

import com.unquiler.beunquiler.controllers.dtos.UserRequestDto
import com.unquiler.beunquiler.repositories.entities.User
import com.unquiler.beunquiler.services.UserService
import com.unquiler.beunquiler.utils.ModelMapper
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.lang.RuntimeException

@RestController
@CrossOrigin(origins = ["http://localhost:8080/", "http://127.0.0.1:5173/%22)"])
@RequestMapping("/register")
class RegisterController(var userService: UserService, var modelMapper: ModelMapper) {

    @PostMapping
    @Throws(Exception::class)
    fun register(@Valid @RequestBody userRequest: UserRequestDto): ResponseEntity<Any> {
        val userToEntity: User = modelMapper.toEntity(userRequest)
        try {
            return ResponseEntity<Any>(userService.register(userToEntity), HttpStatus.OK)
        } catch (e: RuntimeException) {
            return ResponseEntity<Any>(e.message, HttpStatus.NOT_FOUND)
        }
    }
}