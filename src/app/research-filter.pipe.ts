import { Pipe, PipeTransform } from '@angular/core';
import { ResearchData } from './data.service';

@Pipe({
  name: 'researchFilter'
})
export class ResearchFilterPipe implements PipeTransform {

  transform(value: ResearchData[], searchText: string): ResearchData[] {
	if (!value || !searchText)
      return value;
	

    //const srchreg = new RegExp(searchText, 'i');
    //const repreg = new RegExp('(' + searchText + ')', 'gi');
	
	return value.filter( value => {
	return value.theme.toLowerCase().match(searchText.toLowerCase());
	});

    //return value.filter(c =>
    //c.theme.match(searchText));
    //.filter(y => y.theme.length != 0)
  }

}
