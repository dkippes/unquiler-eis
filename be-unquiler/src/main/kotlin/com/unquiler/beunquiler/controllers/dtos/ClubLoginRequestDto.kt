package com.unquiler.beunquiler.controllers.dtos

import org.jetbrains.annotations.NotNull

data class ClubLoginRequestDto (@NotNull val email: String, @NotNull val password: String)