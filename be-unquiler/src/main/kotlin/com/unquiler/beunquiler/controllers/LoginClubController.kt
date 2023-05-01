package com.unquiler.beunquiler.controllers

import com.unquiler.beunquiler.controllers.dtos.ClubLoginRequestDto
import com.unquiler.beunquiler.services.ClubService
import com.unquiler.beunquiler.utils.ModelMapper
import jakarta.validation.Valid
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.lang.RuntimeException

@RestController
@CrossOrigin(origins = ["http://localhost:8080/", "http://127.0.0.1:5173/%22)"])
@RequestMapping("/club")
class LoginClubController(@Autowired var clubService: ClubService, @Autowired var modelMapper: ModelMapper) {

    @PostMapping("/login")
    @Throws(Exception::class)
    fun login(@Valid @RequestBody clubRequestDto: ClubLoginRequestDto): ResponseEntity<Any> {
        val (email, password) = clubRequestDto
        return try {
            var toDto = modelMapper.toDtoSinCanchas(clubService.login(email, password))
            ResponseEntity<Any>(toDto, HttpStatus.OK)
        } catch (e: RuntimeException) {
            ResponseEntity<Any>(e.message, HttpStatus.NOT_FOUND)
        }
    }
}