import { Pipe, PipeTransform } from '@angular/core';
// import { Person } from '../person.interface';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {

  transform(persons: any[], name: string): any[] {
    if (!name) return persons;
    return persons.filter(person => person.name.toLowerCase().includes(name.toLowerCase()));
  }

}
