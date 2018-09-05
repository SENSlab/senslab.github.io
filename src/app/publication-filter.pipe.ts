import { Pipe, PipeTransform } from '@angular/core';
import { Publication, PubInAYear } from './publication/publication.component';

@Pipe({
  name: 'publicationFilter'
})
export class PublicationFilterPipe implements PipeTransform {

  transform(value: [PubInAYear[], PubInAYear[]], searchText: string): PubInAYear[] {
    if (!searchText)
      return value[1];

    const srchreg = new RegExp(searchText, 'i');
    const repreg = new RegExp('(' + searchText + ')', 'gi');

    return value[0]
      .map(y => ({
        year: y.year,
        contents: y.contents.filter(c =>
          c.title.match(srchreg) ||
          (c.detail && c.detail.match(srchreg)))
          .map(y => ({
            title: y.title.replace(repreg, '<span class="search-found">$1</span>'),
            detail: y.detail ? y.detail.replace(repreg, '<span class="search-found">$1</span>') : null
          }) as Publication)
      } as PubInAYear))
      .filter(y => y.contents.length != 0)
  }

}
