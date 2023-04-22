package com.unquiler.beunquiler.controllers

import com.unquiler.beunquiler.controllers.dtos.UserRequestDto
import com.unquiler.beunquiler.repositories.entities.User
import com.unquiler.beunquiler.services.UserService
import com.unquiler.beunquiler.utils.ModelMapper
import jakarta.persistence.EntityNotFoundException
import jakarta.validation.Valid
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin(origins = ["http://localhost:8080/", "http://127.0.0.1:5173/%22)"])
@RequestMapping("/login")
class LoginController(@Autowired var userService: UserService,@Autowired var modelMapper: ModelMapper) {

    @PostMapping
    @Throws(Exception::class)
    fun login(@Valid @RequestBody userRequest: UserRequestDto): ResponseEntity<Any> {
        val loginUser: User = modelMapper.toEntity(userRequest)

        return try {
            val loggedUser = userService.login(loginUser)
            ResponseEntity<Any>(loggedUser, HttpStatus.OK)
        } catch (e: EntityNotFoundException) {
            ResponseEntity<Any>(e.message, HttpStatus.NOT_FOUND)
        }
    }
}