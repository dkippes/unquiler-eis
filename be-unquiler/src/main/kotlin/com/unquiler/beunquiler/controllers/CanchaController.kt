package com.unquiler.beunquiler.controllers

import com.unquiler.beunquiler.services.CanchaService
import com.unquiler.beunquiler.utils.ModelMapper
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin(origins = ["http://localhost:8080/", "http://127.0.0.1:5173/%22)"])
@RequestMapping("/cancha")
class CanchaController(private val canchaService: CanchaService, private val modelMapper: ModelMapper) {

    @GetMapping("/clubLike/{text}")
    fun getByClubName(@PathVariable text: String): ResponseEntity<Any> {
        return try {
            val canchas = canchaService.getByClubName(text)
            val canchasDto = canchas.map { modelMapper.toDtoSinHorarios(it) }
            ResponseEntity<Any>(canchasDto, HttpStatus.OK)
        } catch (err: Exception) {
            ResponseEntity<Any>(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}