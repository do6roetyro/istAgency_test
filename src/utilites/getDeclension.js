export function getDeclension(quantity, one, few, many) {
    const mod10 = quantity % 10;
    const mod100 = quantity % 100;

    if (mod100 >= 11 && mod100 <= 14) {
        return many;
    } else if (mod10 === 1) {
        return one;
    } else if (mod10 >= 2 && mod10 <= 4) {
        return few;
    } else {
        return many;
    }
}