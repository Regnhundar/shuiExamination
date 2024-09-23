import { format, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { sv } from "date-fns/locale";

// @description: Tar emot UTC-tid som ligger på db som sträng och returnerar en ny formaterad sträng i format liknande: "tisdag 19 Sep. 16:45".
export function formatDate(utcDateString: string): string {
    const timeZone = "Europe/Stockholm";
    const utcDate = parseISO(utcDateString);
    const zonedDate = toZonedTime(utcDate, timeZone);

    let formattedDate = format(zonedDate, "EEEE d MMM HH:mm", {
        locale: sv,
    });

    const parts = formattedDate.split(" ");
    if (parts.length > 2) {
        // Stor bokstav på månad (index 2 i array)
        parts[2] = parts[2].charAt(0).toUpperCase() + parts[2].slice(1);
    }

    formattedDate = parts.join(" ");

    return formattedDate;
}

// @description: Tar emot username / message som strängar och verifierar längden på dem. Är det inte korrekt ska inget anrop göras.
export const verifyPost = (username: string, message: string): boolean => {
    if (username.length < 3) {
        return false;
    }
    if (username.length > 20) {
        return false;
    }
    if (message.length < 3) {
        return false;
    }
    if (message.length > 300) {
        return false;
    }
    return true;
};
