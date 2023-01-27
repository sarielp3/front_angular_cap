import { Time } from "@angular/common";
import { Aerolineas } from "./aerolineasReservas";
import { Ciudades } from "./ciudades";

export class VuelosReservas{
    idVuelo!: number;
    origen!: Ciudades;
    destino!: Ciudades;
    aerolinea!: Aerolineas;
    estatus!: String;
    horaSalida!: Time;
    horaLlegada!: Time;
    codigoVuelo!: String;
    costo!: number;
}