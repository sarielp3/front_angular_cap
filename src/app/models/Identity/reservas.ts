import { CuartosReservas } from "./cuartosReservas";
import { HotelesReservas } from "./hotelesReservas";
import { VuelosReservas } from "./vuelosReservas";

export class Reservas{
    fechaInicio!: Date;
	fechaFin!: Date;
	descripcion!: String;
	nombreCliente!: String;
	apellidoPaternoCliente!: String;
	apellidoMaternoCliente!: String;
	idReserva!: number;
	hotel!: HotelesReservas;
	cuarto!: CuartosReservas;
	vuelo!: VuelosReservas;
	/*idHotel!: number;
	idCuarto!: number;
	 idVuelo!: number;*/

}