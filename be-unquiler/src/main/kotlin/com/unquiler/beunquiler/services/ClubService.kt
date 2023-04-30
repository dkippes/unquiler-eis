package com.unquiler.beunquiler.services

import com.unquiler.beunquiler.repositories.entities.Club

interface ClubService {
    fun register(club: Club): Club
    fun login(email: String, password: String): Club
}