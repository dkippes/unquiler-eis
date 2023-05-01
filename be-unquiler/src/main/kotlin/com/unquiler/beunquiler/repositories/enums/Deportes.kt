package com.unquiler.beunquiler.repositories.enums

import com.fasterxml.jackson.annotation.JsonFormat

@JsonFormat(shape = JsonFormat.Shape.STRING)
enum class Deportes(val value: String) {
    BASKET("BASKET"), FUTBOL("FUTBOL"), HOCKEY("HOCKEY"), PADDLE("PADDLE"), TENIS("TENIS"), HANDBALL("HANDBALL"), RUGBY(
        "RUGBY"
    ),
    ATLETISMO("ATLETISMO"), NATACION("NATACION"), ARTE_MARCIAL("ARTE_MARCIAL");




}