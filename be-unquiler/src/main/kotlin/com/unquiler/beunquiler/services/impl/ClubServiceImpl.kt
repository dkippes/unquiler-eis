package com.unquiler.beunquiler.services.impl

import com.unquiler.beunquiler.controllers.dtos.CanchaDTO
import com.unquiler.beunquiler.repositories.dao.CanchaRepository
import com.unquiler.beunquiler.repositories.dao.ClubRepository
import com.unquiler.beunquiler.repositories.entities.Cancha
import com.unquiler.beunquiler.repositories.entities.Club
import com.unquiler.beunquiler.services.ClubService
import jakarta.persistence.EntityNotFoundException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class ClubServiceImpl : ClubService {
    @Autowired
    lateinit var clubRepository: ClubRepository
    @Autowired
    lateinit var canchaRepository: CanchaRepository

    override fun register(club: Club): Club {
        val isClubTaken = clubRepository.existsClubByEmail(club.getEmail()!!)
        if (isClubTaken) {
            throw RuntimeException("El club ya existe")
        }
        return clubRepository.save(club)
    }

    override fun login(email: String, password: String): Club {
        val club = clubRepository.findByEmailAndPassword(email, password)

        if(club.isEmpty) throw EntityNotFoundException()

        return club.get()
    }

    override fun publicarCancha(id: Long, cancha: Cancha): Cancha {
        val club = clubRepository.findById(id)

        if(club.isEmpty) throw EntityNotFoundException("El club no existe")

        club.get().registrarCancha(cancha)

        canchaRepository.save(cancha)
        clubRepository.save(club.get())
        return cancha
    }

    override fun getClubInformation(id: Long): Club {
        val club = clubRepository.findById(id)

        if(club.isEmpty) throw EntityNotFoundException("El club no existe")

        return club.get()
    }
}