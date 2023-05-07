package com.unquiler.beunquiler.services.impl

import com.unquiler.beunquiler.repositories.dao.CanchaRepository
import com.unquiler.beunquiler.repositories.entities.Cancha
import com.unquiler.beunquiler.services.CanchaService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
@Service
@Transactional
class CanchaServiceImpl: CanchaService {

    @Autowired
    lateinit var canchaRepository: CanchaRepository
    override fun getByClubName(clubName: String): Array<Cancha> {
        return canchaRepository.findByClubName(clubName)
    }

    override fun getLastCanchas(qty: Int): Array<Cancha> {
        return canchaRepository.getLastCanchas(qty.toLong())
    }

}