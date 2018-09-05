import { Pipe, PipeTransform } from '@angular/core';
import { PubInAYear } from './publication/publication.component';

@Pipe({
  name: 'publicationFilter'
})
export class PublicationFilterPipe implements PipeTransform {

  transform(value: [PubInAYear[], PubInAYear[]], searchText: string): PubInAYear[] {
    if (!searchText)
      return value[1];

    searchText = searchText.toLocaleLowerCase();

    return value[0]
      .map(y => ({
        year: y.year,
        contents: y.contents.filter(c =>
          c.title.toLocaleLowerCase().includes(searchText) ||
          (c.detail && c.detail.toLocaleLowerCase().includes(searchText))
        )
      } as PubInAYear))
      .filter(y => y.contents.length != 0);
  }

}
