package com.unquiler.beunquiler.services.impl

import com.unquiler.beunquiler.repositories.dao.CanchaAlquiladaRepository
import com.unquiler.beunquiler.repositories.dao.CanchaRepository
import com.unquiler.beunquiler.repositories.dao.ClubRepository
import com.unquiler.beunquiler.repositories.dao.UserRepository
import com.unquiler.beunquiler.repositories.entities.Cancha
import com.unquiler.beunquiler.repositories.entities.Horario
import com.unquiler.beunquiler.repositories.entities.User
import com.unquiler.beunquiler.services.UserService
import jakarta.persistence.EntityNotFoundException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class UserServiceImpl : UserService {
    @Autowired
    lateinit var userRepository: UserRepository

    @Autowired
    lateinit var canchaRepository: CanchaRepository

    @Autowired
    lateinit var reservasRepository: CanchaAlquiladaRepository

    @Autowired
    lateinit var clubRepository: ClubRepository

    @Autowired
    lateinit var clubServiceImpl: ClubServiceImpl

    override fun register(user: User): User {
        val isUsernameTaken = userRepository.existsUserByEmail(user.getEmail()!!)
        if (isUsernameTaken) {
            throw RuntimeException("El username ya existe")
        }
        return userRepository.save(user)
    }

    override fun login(user: User): User {
        val loggedUser = userRepository.findByEmailAndPassword(user.getEmail()!!, user.getPassword()!!)

        if (loggedUser.isEmpty) throw EntityNotFoundException()

        return loggedUser.get()
    }

    override fun alquilarCancha(idUsuario: Long, idCancha: Long, fecha: String, horario: Horario) {
        val user = userRepository.findById(idUsuario).get()
        val cancha = canchaRepository.findById(idCancha).get()

        user.alquilar(cancha, fecha, horario)

        userRepository.save(user)
    }

    override fun reservas(idUsuario: Long): List<ReservaDTO> {
        val reservas = userRepository.findById(idUsuario).get().getReservas()
        val reservasDTO = arrayListOf<ReservaDTO>()
        if (reservas != null) {
            for (reserva in reservas) {
                val userId = reserva.usuario?.getId()!!
                val nombreClub = reserva?.cancha?.club?.getNombreClub()
                val nombreCancha = reserva?.cancha?.nombre
                val fecha = reserva?.fecha
                val horario = reserva?.horario.toString()
                val deporte = reserva?.cancha?.deporte.toString()
                val precio = reserva?.cancha?.precio
                val pagado = false
                val reservaDTO =
                    ReservaDTO(reserva.id!!, userId, nombreClub!!, nombreCancha!!, fecha!!, horario!!, deporte!!, precio!!, pagado)
                reservasDTO.add(reservaDTO)
            }
        }
        return reservasDTO
    }

    override fun cancelarReservas(idUsuario: Long, idReserva: Long): List<ReservaDTO> {
        /*val reserva = reservasRepository.findById(idReserva).get()
        reserva.cancelarReserva()
        val club = reserva.cancha?.club
        val cancha = reserva.cancha
        val horario = reserva.horario*/
        /*horario?.disponible = true
        cancha?.horariosDisponibles?.get(reserva.fecha)?.map { h ->
            if (h.hora == horario?.hora) {
                h.disponible = true
            }
        }*/
        //cancha?.cambiarDisponibilidadHorario(reserva.fecha.toString(), horario?.hora!!)
        //canchaRepository.save(cancha!!)
        //val reservaa = reservasRepository.findById(idReserva).orElseThrow { RuntimeException("Reserva no encontrada") }


        //reservasRepository.cancelarReserva(idReserva)
        /*
        canchaRepository.deleteById(cancha?.id!!)
        canchaRepository.save(nuevaCancha)
        canchaRepository.setDisponible(cancha?.id!!)*/

        val reserva = reservasRepository.findById(idReserva).orElseThrow { RuntimeException("Reserva no encontrada") }

        // Cancelar la reserva
        reserva.cancelarReserva()

        val cancha = reserva.cancha
        val nuevaCancha = Cancha(
            cancha?.club,
            cancha?.nombre,
            cancha?.capacidad!!,
            cancha.deporte,
            cancha.precio,
            cancha.horariosDisponibles
        )
        val horario = reserva.horario

        // Actualizar disponibilidad en la cancha
        horario?.disponible = true
        cancha?.horariosDisponibles?.get(reserva.fecha)?.let { horariosFecha ->
            horariosFecha.find { it.hora == horario?.hora }?.disponible = true
        }

        // Guardar la cancha actualizada
        canchaRepository.save(cancha!!)

        // Eliminar la reserva de canchas_alquiladas
        reservasRepository.cancelarReserva(reserva.id!!)
        //canchaRepository.save(cancha)


        val reservas = userRepository.findById(idUsuario).get().getReservas()
        val reservasDTO = arrayListOf<ReservaDTO>()
        if (reservas != null) {
            for (reserva in reservas) {
                val userId = reserva.usuario?.getId()!!
                val nombreClub = reserva?.cancha?.club?.getNombreClub()
                val nombreCancha = reserva?.cancha?.nombre
                val fecha = reserva?.fecha
                val horario = reserva?.horario.toString()
                val deporte = reserva?.cancha?.deporte.toString()
                val precio = reserva?.cancha?.precio
                val pagado = false
                val reservaDTO =
                    ReservaDTO(reserva.id!!, userId, nombreClub!!, nombreCancha!!, fecha!!, horario!!, deporte!!, precio!!, pagado)
                reservasDTO.add(reservaDTO)
            }
        }
        return reservasDTO
    }
}