package com.unquiler.beunquiler.services.impl

import com.unquiler.beunquiler.repositories.dao.CanchaAlquiladaRepository
import com.unquiler.beunquiler.repositories.dao.CanchaRepository
import com.unquiler.beunquiler.repositories.dao.ClubRepository
import com.unquiler.beunquiler.repositories.dao.UserRepository
import com.unquiler.beunquiler.repositories.entities.CanchaAlquilada
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
        //val reserva = reservasRepository.findById(idReserva).get()
        /*
        val club = reserva.cancha?.club
        val cancha = reserva.cancha
        val horario = reserva.horario
        horario?.disponible = true
        cancha?.horariosDisponibles?.get(reserva.fecha)?.map { h ->
            if (h.hora == horario?.hora) {
                h.disponible = true
            }
        }*/
        //club?.registrarCancha(cancha!!)
        //clubRepository.saveAndFlush(club!!)
        //canchaRepository.saveAndFlush(cancha!!)
        //canchaRepository.setDisponible(cancha?.id!!)
        //canchaRepository.save(cancha!!)
        val reservaa = reservasRepository.findById(idReserva).orElseThrow { RuntimeException("Reserva no encontrada") }
        reservaa.cancelarReserva()

        val cancha = reservaa.cancha ?: throw RuntimeException("Cancha no encontrada")
        val fecha = reservaa.fecha ?: throw RuntimeException("Fecha de reserva no encontrada")
        val horario = reservaa.horario?.hora ?: throw RuntimeException("Horario de reserva no encontrado")

        cancha.cambiarDisponibilidadHorario(fecha, horario)
        canchaRepository.saveAndFlush(cancha)
        reservasRepository.cancelarReserva(idReserva);
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