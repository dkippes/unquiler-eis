package com.unquiler.beunquiler.services.impl

import com.unquiler.beunquiler.repositories.dao.CanchaRepository
import com.unquiler.beunquiler.repositories.dao.UserRepository
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

    override fun register(user: User): User {
        val isUsernameTaken = userRepository.existsUserByEmail(user.getEmail()!!)
        if (isUsernameTaken) {
            throw RuntimeException("El username ya existe")
        }
        return userRepository.save(user)
    }

    override fun login(user: User): User {
        val loggedUser = userRepository.findByEmailAndPassword(user.getEmail()!!, user.getPassword()!!)

        if(loggedUser.isEmpty) throw EntityNotFoundException()

        return loggedUser.get()
    }

    override fun alquilarCancha(idUsuario: Long, idCancha: Long, fecha: String, horario: Horario) {
        val user = userRepository.findById(idUsuario).get()
        val cancha = canchaRepository.findById(idCancha).get()

        user.alquilar(cancha, fecha, horario)

        userRepository.save(user)
    }
}