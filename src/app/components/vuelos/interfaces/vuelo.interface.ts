import { Aerolinea } from './aerolinea.interface';
import { Ciudad } from './ciudad.interface';
export interface Vuelo {
    idVuelo:     number;
    origen:      Ciudad;
    destino:     Ciudad;
    aerolinea:   Aerolinea;
    estatus:     string;
    horaSalida:  string;
    horaLlegada: string;
    codigoVuelo: string;
    costo:       number;
}