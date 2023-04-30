package com.unquiler.beunquiler.services

import com.unquiler.beunquiler.repositories.entities.Club

interface ClubService {
    fun register(club: Club): Club
}