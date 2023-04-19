package com.unquiler.beunquiler.utils

import com.unquiler.beunquiler.controllers.dtos.UserRequestDto
import com.unquiler.beunquiler.repositories.entities.User
import org.springframework.stereotype.Component

@Component
class ModelMapper {
    fun toEntity(userRequestDto: UserRequestDto): User {
        return User(userRequestDto.getEmail(), userRequestDto.getPassword())
    }

    companion object {
        private var instance: ModelMapper? = null
        fun getInstance(): ModelMapper {
            if (instance == null) {
                instance = ModelMapper()
            }
            return instance!!
        }
    }
}