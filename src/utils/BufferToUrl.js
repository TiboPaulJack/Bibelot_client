

export default function bufferToUrl(buffer) {
    const pics = new Uint8Array(buffer);
    const blob = new Blob([pics], { type: "image/png" });
    return URL.createObjectURL(blob);
}
