package com.unquiler.beunquiler.services

import com.unquiler.beunquiler.repositories.entities.User
import com.unquiler.beunquiler.repositories.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class UserServiceImpl : UserService {
    @Autowired
    private lateinit var userRepository: UserRepository

    override fun register(user: User): User {
        return userRepository.save(user)
    }
}