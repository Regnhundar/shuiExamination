import { format, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { sv } from 'date-fns/locale';

// @description: Tar emot UTC-tid som ligger på db som sträng och returnerar en ny formaterad sträng i format liknande: "tisdag 19 Sep, 16:45".
export function formatUtcToCet(utcDateString: string): string {
    const timeZone = 'Europe/Stockholm';
    const utcDate = parseISO(utcDateString);  
    const zonedDate = toZonedTime(utcDate, timeZone);

    const formattedDate = format(zonedDate, "EEEE d MMM, HH:mm", { locale: sv });
    return formattedDate;
}


