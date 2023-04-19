package com.unquiler.beunquiler.services

import com.unquiler.beunquiler.repositories.dao.UserRepository
import com.unquiler.beunquiler.repositories.entities.User
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.Mock
import org.mockito.Mockito.*
import org.mockito.MockitoAnnotations

class UserServiceImplTest {
    private lateinit var userServiceImpl: UserServiceImpl

    @Mock
    private lateinit var userRepository: UserRepository

    private val testUser = User("test_username", "test_password")

    @BeforeEach
    fun setUp() {
        MockitoAnnotations.openMocks(this)
        userServiceImpl = UserServiceImpl()
        userServiceImpl.userRepository = userRepository
    }

    @Test
    fun `register should return a user when a valid user is provided`() {
        `when`(userRepository.existsUserByUsername(testUser.getUsername()!!)).thenReturn(false)
        `when`(userRepository.save(testUser)).thenReturn(testUser)

        val result = userServiceImpl.register(testUser)

        assertEquals(testUser, result)
        verify(userRepository, times(1)).existsUserByUsername(testUser.getUsername()!!)
        verify(userRepository, times(1)).save(testUser)
    }

    @Test
    fun `register should throw an exception when a user with the same username already exists`() {
        `when`(userRepository.existsUserByUsername(testUser.getUsername()!!)).thenReturn(true)

        assertThrows(Exception::class.java) {
            userServiceImpl.register(testUser)
        }

        verify(userRepository, times(1)).existsUserByUsername(testUser.getUsername()!!)
        verify(userRepository, never()).save(testUser)
    }

    @Test
    fun `register should save the user when the username is available`() {
        `when`(userRepository.existsUserByUsername(testUser.getUsername()!!)).thenReturn(false)
        `when`(userRepository.save(testUser)).thenReturn(testUser)

        userServiceImpl.register(testUser)

        verify(userRepository, times(1)).existsUserByUsername(testUser.getUsername()!!)
        verify(userRepository, times(1)).save(testUser)
    }
}