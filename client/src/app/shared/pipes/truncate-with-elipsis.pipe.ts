import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateWithElipsis',
})
export class TruncateWithElipsisPipe implements PipeTransform {
  transform(value: string, maxLength: number = 40): unknown {
    if (!value) return '';
    return value.length > maxLength
      ? value.substring(0, maxLength) + '...'
      : value;
  }
}
