function stringToBytes(str) {
    return new TextEncoder().encode(str)
}
function bytesToString(bytes) {
    return new TextDecoder().decode(bytes);
}
function base64ToBytes(base64) {
    const binString = atob(base64);
    return Uint8Array.from(binString, (m) => m.codePointAt(0));
}
function bytesToBase64(bytes) {
    const binString = String.fromCodePoint(...bytes);
    return btoa(binString);
}
function stringToBase64(str) {
    return bytesToBase64(stringToBytes(str));
}
function base64ToString(base64) {
    return bytesToString(base64ToBytes(base64));
}
function base64Html(input) {
    return Buffer.from(input).toString('base64');
}

module.exports =  {
    stringToBytes,
    bytesToString,
    base64ToBytes,
    bytesToBase64,
    stringToBase64,
    base64ToString,
    base64Html
}