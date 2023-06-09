package com.unquiler.beunquiler.repositories.entities

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.unquiler.beunquiler.repositories.enums.Deportes
import jakarta.persistence.*
import org.hibernate.annotations.Cascade
import java.time.LocalTime

@Converter
class HorariosDisponiblesConverter : AttributeConverter<Map<String, MutableSet<Horario>>, String> {
    private val objectMapper = jacksonObjectMapper()

    override fun convertToDatabaseColumn(attribute: Map<String, MutableSet<Horario>>?): String? {
        return attribute?.let {
            objectMapper.writeValueAsString(it)
        }
    }

    override fun convertToEntityAttribute(dbData: String?): Map<String, MutableSet<Horario>>? {
        return dbData?.let {
            objectMapper.readValue(it, object : TypeReference<Map<String, MutableSet<Horario>>>() {})
        }
    }
}

@Entity
@Table(name = "canchas")
class Cancha(
    @ManyToOne(cascade = [CascadeType.ALL])
    var club: Club?,
    var nombre: String?,
    var urlImagen: String?,
    var capacidad: Int,
    var deporte: Deportes?,
    var precio: Double,

    @ElementCollection
    @CollectionTable(
        name = "horarios_disponibles",
        joinColumns = [JoinColumn(name = "cancha_id")]
    )
    @MapKeyColumn(name = "fecha")
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    @Convert(converter = HorariosDisponiblesConverter::class)
    var horariosDisponibles: MutableMap<String, MutableSet<Horario>> = mutableMapOf()

) {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    constructor() : this(null,  null, null, 0, null, 0.0, mutableMapOf(), )

    fun cambiarDisponibilidadHorario(fecha: String, hora: LocalTime) {
        val horariosDisponiblesFecha = horariosDisponibles[fecha]
        val horarioReserva = horariosDisponiblesFecha?.find { it.hora == hora }
        horarioReserva?.disponible = true
    }
}
