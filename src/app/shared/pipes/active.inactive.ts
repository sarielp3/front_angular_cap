import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'activeInactive'
})
export class ActiveInactive implements PipeTransform {
    transform(value:number):string{
        if(value === 1){
            return 'Activo';
        }else{
            return 'InActivo';
        }
    }

}