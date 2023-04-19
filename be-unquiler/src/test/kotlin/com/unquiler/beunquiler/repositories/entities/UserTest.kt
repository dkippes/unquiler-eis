package com.unquiler.beunquiler.repositories.entities

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

class UserTest {
    private val testUsername = "test_username"
    private val testPassword = "test_password"
    private val testUser = User(testUsername, testPassword)

    @Test
    fun `getId should return the correct ID`() {
        assertNull(testUser.getId())
    }

    @Test
    fun `getUsername should return the correct username`() {
        assertEquals(testUsername, testUser.getUsername())
    }

    @Test
    fun `getPassword should return the correct password`() {
        assertEquals(testPassword, testUser.getPassword())
    }

    @Test
    fun `setPassword should set the password correctly`() {
        val newPassword = "new_password"
        testUser.setPassword(newPassword)
        assertEquals(newPassword, testUser.getPassword())
    }
}