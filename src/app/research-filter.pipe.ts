import { Pipe, PipeTransform } from '@angular/core';
import { ResearchData } from './data.service';

@Pipe({
  name: 'researchFilter'
})
export class ResearchFilterPipe implements PipeTransform {

  transform(value: ResearchData[], searchText: string): ResearchData[] {
	  if (!value || !searchText)
      return value;
	
    return value.filter( val => {return val.theme.match(searchText);});
  }

}
