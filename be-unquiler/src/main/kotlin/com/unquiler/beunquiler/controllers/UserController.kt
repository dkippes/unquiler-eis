package com.unquiler.beunquiler.controllers

import com.unquiler.beunquiler.controllers.dtos.AlquilerDataDTO
import com.unquiler.beunquiler.controllers.dtos.UserRequestDto
import com.unquiler.beunquiler.repositories.entities.Horario
import com.unquiler.beunquiler.repositories.entities.User
import com.unquiler.beunquiler.services.UserService
import com.unquiler.beunquiler.utils.ModelMapper
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.LocalTime
import kotlin.RuntimeException

@RestController
@CrossOrigin(origins = ["http://localhost:8080/", "http://127.0.0.1:5173/%22)"])
@RequestMapping("/user")
class UserController(var userService: UserService, var modelMapper: ModelMapper) {

    @PostMapping("/register")
    @Throws(Exception::class)
    fun register(@Valid @RequestBody userRequest: UserRequestDto): ResponseEntity<Any> {
        val userToEntity: User = modelMapper.toEntity(userRequest)
        try {
            return ResponseEntity<Any>(userService.register(userToEntity), HttpStatus.OK)
        } catch (e: RuntimeException) {
            return ResponseEntity<Any>(e.message, HttpStatus.NOT_FOUND)
        }
    }

    @PutMapping("/{id_usuario}/alquilar/{id_cancha}")
    @Throws(RuntimeException::class)
    fun alquilarCancha(@PathVariable id_usuario: Long,@PathVariable id_cancha: Long, @RequestBody body: AlquilerDataDTO) {
        userService.alquilarCancha(id_usuario, id_cancha, body.fecha, Horario(LocalTime.parse(body.hora), true))
    }

    @GetMapping("/{idUsuario}/reservas")
    fun reservas(@PathVariable idUsuario: Long): ResponseEntity<Any> {
        try {
            return ResponseEntity<Any>(userService.reservas(idUsuario), HttpStatus.OK)
        } catch (e: RuntimeException) {
            return ResponseEntity<Any>(e.message, HttpStatus.NOT_FOUND)
        }
    }

    @GetMapping("/{idUsuario}/{idReserva}/cancelar")
    fun cancelarReserva(@PathVariable idUsuario: String, @PathVariable idReserva: String): ResponseEntity<Any> {
        try {
            return ResponseEntity<Any>(userService.cancelarReservas(idUsuario.toLong(), idReserva.toLong()), HttpStatus.OK)
        } catch (e: RuntimeException) {
            return ResponseEntity<Any>(e.message, HttpStatus.NOT_FOUND)
        }
    }
}