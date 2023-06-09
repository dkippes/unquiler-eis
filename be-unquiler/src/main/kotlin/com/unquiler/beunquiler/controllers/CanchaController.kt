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
            val canchasDto = canchas.map { modelMapper.toDtoSinHorarios(it, it.club!!.getId()) }
            ResponseEntity<Any>(canchasDto, HttpStatus.OK)
        } catch (err: Exception) {
            ResponseEntity<Any>(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @GetMapping("/ultimas-canchas")
    fun getLast10Canchas(@RequestParam(required = false) inicio: String?,
                         @RequestParam(required = false) fin: String?): ResponseEntity<Any> {
        //retorna las ultimas 10 canchas agregadas
        return try {
            val canchas = canchaService.getLastCanchas(10, inicio, fin)
            val canchasDto = canchas.map { modelMapper.toDtoSinHorarios(it, it.club!!.getId()) }
            ResponseEntity<Any>(canchasDto, HttpStatus.OK)
        } catch (err: Exception) {
            ResponseEntity<Any>(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    
    @GetMapping("/{id_club}/{id_cancha}")
    fun getDetails(@PathVariable id_club: Long,@PathVariable id_cancha: Long): ResponseEntity<Any> {
        return try {
            val canchas = canchaService.getDetails(id_cancha)
            val canchasDto = canchas.map { modelMapper.toDto(it) }
            ResponseEntity<Any>(canchasDto, HttpStatus.OK)
        } catch (err: Exception) {
            ResponseEntity<Any>(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
