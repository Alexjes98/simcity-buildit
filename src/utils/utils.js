export function __hash__() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}