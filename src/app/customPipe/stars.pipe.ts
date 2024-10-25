import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stars',
  standalone: true
})
export class StarsPipe implements PipeTransform {

  transform(value: number): string[] {
    let result : string[] = [];
    while( result.length < 5){
      if( value >= 1 || value >= 0.8){
        result.push("fa-solid fa-star");
        value -= 1;
      }else if( value >= 0.3 && value < 0.8){
        result.push("fa-solid fa-star-half-stroke");
        value -= 1;
      }else{
        result.push("fa-regular fa-star");
        value -= 1;
      }
    }
    return result;
  }

}
