import { Pipe, PipeTransform } from '@angular/core';
/*
 * Transform string to shorter string
 * 
*/
@Pipe({ name: 'shortenText' })
export class ShortenTextPipe implements PipeTransform {
    transform(value: string, maxLength: number = 200): string {
        if(value.length > maxLength) { 
            return value.slice(0, maxLength) + "...";
        } else {
            return value;
        }
    }
}