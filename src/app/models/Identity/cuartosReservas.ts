import { HotelesReservas } from "./hotelesReservas";

export class CuartosReservas{
    idCuarto!: number;
    nombreCuarto!: String;
    descripcion!: String;
    numeroPersonas!: number;
    codigoCuartos!: String;
    costoNoche!: number;
    tipoCuarto!: String;
    hotel!: HotelesReservas;
    idHotel!: number;
}