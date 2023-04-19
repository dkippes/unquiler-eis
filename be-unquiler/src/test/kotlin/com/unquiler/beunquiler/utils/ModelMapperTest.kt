package com.unquiler.beunquiler.utils

import com.unquiler.beunquiler.controllers.dtos.UserRequestDto
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

class ModelMapperTest {
    private val testUsername = "test_username"
    private val testPassword = "test_password"
    private val testUserRequestDto = UserRequestDto(testUsername, testPassword)
    private val modelMapper = ModelMapper.getInstance()

    @Test
    fun `toEntity should return a User with the correct username and password`() {
        val user = modelMapper.toEntity(testUserRequestDto)
        assertNotNull(user)
        assertEquals(testUsername, user.getEmail())
        assertEquals(testPassword, user.getPassword())
    }
}