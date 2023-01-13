import {Carta} from './cartas';


export interface MesaItem {
    id_mesa?: number,
    mesa: string;
    total: number;
    order: Carta[];
}