import { format } from "date-fns";

export function formatDate(dateTime: string) {
    return format(new Date(dateTime), 'dd/MM/yyyy');
}

export function formatTime(dateTime: string) {
    return format(new Date(dateTime), 'HH:mm');
}

export function today() {
    return format(new Date(), 'yyyy-MM-dd');
}