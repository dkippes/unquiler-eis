package com.unquiler.beunquiler.services

import com.unquiler.beunquiler.repositories.dao.UserRepository
import com.unquiler.beunquiler.repositories.entities.User
import jakarta.persistence.EntityNotFoundException
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.Mock
import org.mockito.Mockito.*
import org.mockito.MockitoAnnotations
import java.util.*

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
        `when`(userRepository.existsUserByEmail(testUser.getEmail()!!)).thenReturn(false)
        `when`(userRepository.save(testUser)).thenReturn(testUser)

        val result = userServiceImpl.register(testUser)

        assertEquals(testUser, result)
        verify(userRepository, times(1)).existsUserByEmail(testUser.getEmail()!!)
        verify(userRepository, times(1)).save(testUser)
    }

    @Test
    fun `register should throw an exception when a user with the same username already exists`() {
        `when`(userRepository.existsUserByEmail(testUser.getEmail()!!)).thenReturn(true)

        assertThrows(Exception::class.java) {
            userServiceImpl.register(testUser)
        }

        verify(userRepository, times(1)).existsUserByEmail(testUser.getEmail()!!)
        verify(userRepository, never()).save(testUser)
    }

    @Test
    fun `register should save the user when the username is available`() {
        `when`(userRepository.existsUserByEmail(testUser.getEmail()!!)).thenReturn(false)
        `when`(userRepository.save(testUser)).thenReturn(testUser)

        userServiceImpl.register(testUser)

        verify(userRepository, times(1)).existsUserByEmail(testUser.getEmail()!!)
        verify(userRepository, times(1)).save(testUser)
    }

    @Test
    fun `login should return the user if the user exists`() {
        `when`(userRepository.findByEmail(testUser.getEmail()!!)).thenReturn(Optional.of(testUser))

        val result = userServiceImpl.login(testUser)

        assertEquals(testUser, result)
    }

    @Test
    fun `login should throw EntityNotFoundException if the user does not exist`() {
        `when`(userRepository.findByEmail(testUser.getEmail()!!)).thenReturn(Optional.empty())

        assertThrows(EntityNotFoundException::class.java) {
            userServiceImpl.login(testUser)
        }
    }

}