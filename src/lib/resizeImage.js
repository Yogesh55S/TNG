// Shrinks a phone photo before upload so a request with several images stays small.
export async function resizeImage(file, maxSize = 1600, quality = 0.8) {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
    return blob || file;
  } catch {
    return file; // Format the browser can't decode: send the original.
  }
}
