package com.unquiler.beunquiler.repositories.entities

import com.fasterxml.jackson.core.JsonGenerator
import com.fasterxml.jackson.databind.JsonSerializable
import com.fasterxml.jackson.databind.SerializerProvider
import com.fasterxml.jackson.databind.jsontype.TypeSerializer
import jakarta.persistence.Embeddable
import lombok.ToString
import java.time.LocalTime

@Embeddable
class Horario(
    val hora: LocalTime?,
    var disponible: Boolean
) : java.io.Serializable, JsonSerializable {
    constructor() : this(null, false) {

    }

    override fun serializeWithType(serializer: JsonGenerator, provider: SerializerProvider, typeSer: TypeSerializer) {
        serialize(serializer, provider)
    }

    override fun serialize(jsonGenerator: JsonGenerator, serializerProvider: SerializerProvider) {
        jsonGenerator.writeStartObject()
        jsonGenerator.writeStringField("hora", hora.toString())
        jsonGenerator.writeBooleanField("disponible", disponible)
        jsonGenerator.writeEndObject()
    }

    override fun toString(): String {
        return "$hora"
    }
}