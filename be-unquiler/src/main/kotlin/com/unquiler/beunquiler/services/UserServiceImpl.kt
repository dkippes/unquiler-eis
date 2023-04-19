package com.unquiler.beunquiler.services

import com.unquiler.beunquiler.repositories.dao.UserRepository
import com.unquiler.beunquiler.repositories.entities.User
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class UserServiceImpl : UserService {
    @Autowired
    lateinit var userRepository: UserRepository

    override fun register(user: User): User {
        val isUsernameTaken = userRepository.existsUserByEmail(user.getEmail()!!)
        if (isUsernameTaken) {
            throw RuntimeException("El username ya existe")
        }
        return userRepository.save(user)
    }
}