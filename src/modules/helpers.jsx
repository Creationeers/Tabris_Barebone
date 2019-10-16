import { drawer } from 'tabris';

const minimum_name_length = 6;

export function getTimeOfDay(hours) {
    if (hours <= 5) {
        return "Night";
    }
    if (hours <= 12) {
        return "Morning";
    }
    if (hours <= 18) {
        return "Afternoon";
    }
    if (hours <= 23) {
        return "Evening";
    }
}

export function logout() {
    drawer.enabled = false;
    localStorage.clear();
}

export function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function getNameIsMinimalLength(name) {
    return name.length >= minimum_name_length;
}
