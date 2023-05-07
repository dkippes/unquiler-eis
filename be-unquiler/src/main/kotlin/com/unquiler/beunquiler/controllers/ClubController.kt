package com.unquiler.beunquiler.controllers

import com.unquiler.beunquiler.controllers.dtos.CanchaDTO
import com.unquiler.beunquiler.controllers.dtos.CanchaDTOSinHorarios
import com.unquiler.beunquiler.controllers.dtos.ClubRequestDto
import com.unquiler.beunquiler.repositories.entities.Club
import com.unquiler.beunquiler.repositories.enums.Deportes
import com.unquiler.beunquiler.services.ClubService
import com.unquiler.beunquiler.utils.ModelMapper
import jakarta.persistence.EntityNotFoundException
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import kotlin.RuntimeException

@RestController
@CrossOrigin(origins = ["http://localhost:8080/", "http://127.0.0.1:5173/%22)"])
@RequestMapping("/club")
class ClubController(var clubService: ClubService, var modelMapper: ModelMapper) {

    @PostMapping("/register")
    @Throws(Exception::class)
    fun register(@Valid @RequestBody clubRequestDto: ClubRequestDto): ResponseEntity<Any> {
        val clubToEntity: Club = modelMapper.toEntity(clubRequestDto)
        try {
            return ResponseEntity<Any>(clubService.register(clubToEntity), HttpStatus.OK)
        } catch (e: RuntimeException) {
            return ResponseEntity<Any>(e.message, HttpStatus.NOT_FOUND)
        }
    }

    @PostMapping("/{id}/publish")
    @Throws(Exception::class)
    fun publicarCancha(@Valid @RequestBody canchaDto: CanchaDTO, @Valid @PathVariable id: Long): ResponseEntity<Any> {
        return try {
            // TODO: Hay que devolver un DTO
            clubService.publicarCancha(id, modelMapper.toEntity(canchaDto))
            ResponseEntity<Any>("OK", HttpStatus.OK)
        } catch (e: EntityNotFoundException) {
            return ResponseEntity<Any>(e.message, HttpStatus.NOT_FOUND)
        }
    }

    @GetMapping("/deportes")
    fun deportes(): ResponseEntity<Any> {
        return ResponseEntity<Any>(Deportes.values().map { it.value }, HttpStatus.OK)
    }

    @GetMapping("{id}")
    fun informacionDeClub(@Valid @PathVariable id: Long): ResponseEntity<Any> {
        return try {
            ResponseEntity<Any>(modelMapper.toDto(clubService.getClubInformation(id)), HttpStatus.OK)
        } catch (err: EntityNotFoundException) {
            ResponseEntity<Any>(err.message, HttpStatus.NOT_FOUND)
        }
    }
}