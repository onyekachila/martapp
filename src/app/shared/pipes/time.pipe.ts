import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'time'
})

export class TimePipe implements PipeTransform {

    transform(time: string): string {
        if (time) {
            try {
                return time.substring(0, time.indexOf('T'));
            } catch (error) {
                return "";
            }
        } else { return ""; }
    }

}
