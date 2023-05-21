package com.unquiler.beunquiler.configuration

import com.unquiler.beunquiler.repositories.dao.CanchaRepository
import com.unquiler.beunquiler.repositories.dao.ClubRepository
import com.unquiler.beunquiler.repositories.dao.UserRepository
import com.unquiler.beunquiler.repositories.entities.Cancha
import com.unquiler.beunquiler.repositories.entities.Club
import com.unquiler.beunquiler.repositories.entities.Horario
import com.unquiler.beunquiler.repositories.entities.User
import com.unquiler.beunquiler.repositories.enums.Deportes
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import org.springframework.web.filter.CorsFilter
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import java.time.LocalDate
import java.time.LocalTime

@Configuration
class CorsConfiguration {

    @Bean
    fun run(@Autowired userRepo: UserRepository,  clubRepo: ClubRepository) : CommandLineRunner {
        return CommandLineRunner { args ->
            val cai = clubRepo.save(Club("boca@gmail.com", "Boca", "Mordor al 2000", "CONTRA"))
            val boca = clubRepo.save(Club("independiente@gmail.com", "Independiente", "Abajo de un puente, 500", "CONTRA2"))

            val horarios = mutableMapOf<String, MutableSet<Horario>>(
                Pair(LocalDate.now().toString(), mutableSetOf(
                    Horario(LocalTime.of(20, 49), true), Horario(LocalTime.of(18, 30), true)
                )))
            val horarios2 = mutableMapOf<String, MutableSet<Horario>>(
                Pair(LocalDate.now().toString(), mutableSetOf(
                    Horario(LocalTime.of(19, 20), true), Horario(LocalTime.of(18, 30), true)
                )))

            val cancha1 = Cancha(cai, "Cancha 2", 10, Deportes.ATLETISMO, 330.30, horarios)
            val cancha2= Cancha(boca, "Cancha 3", 22, Deportes.FUTBOL, 3300.30, horarios2)

            cai.registrarCancha(cancha1)
            boca.registrarCancha(cancha2)

            clubRepo.save(cai)
            clubRepo.save(boca)

            userRepo.save(User("m@gmail.com", "mmmmmmm"))
            userRepo.save(User("a@gmail.com", "aaaaaaa"))
            userRepo.save(User("b@gmail.com", "bbbbbbb"))
            userRepo.save(User("c@gmail.com", "ccccccc"))


        }
    }

    @Bean
    fun corsFilter(): CorsFilter {
        val source = UrlBasedCorsConfigurationSource()
        val config = CorsConfiguration()
        config.allowedOrigins = listOf("*")
        config.allowedMethods = listOf("*")
        config.allowedHeaders = listOf("*")
        source.registerCorsConfiguration("/**", config)
        return CorsFilter(source)
    }

}

@Configuration
class WebMvcConfiguration : WebMvcConfigurer {

    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**")
            .allowedOrigins("*")
            .allowedMethods("*")
            .allowedHeaders("*")
    }

}