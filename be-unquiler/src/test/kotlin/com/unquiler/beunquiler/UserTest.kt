package com.unquiler.beunquiler

import com.unquiler.beunquiler.repositories.UserRepository
import com.unquiler.beunquiler.repositories.entities.User
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status


@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension::class)
class UserTest {

    @Autowired
    private lateinit var userRepository: UserRepository

    @Autowired
    lateinit var mockMvc: MockMvc

    @Test
    fun test() {
        userRepository.save(User())

        mockMvc.perform(get("/ping"))
            .andExpect(status().isOk())

        Assertions.assertEquals(1, 1)
    }
}