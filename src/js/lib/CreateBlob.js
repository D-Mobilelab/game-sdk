window.URL = window.webkitURL || window.URL;
window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;

export default function createBlob(input, type) {
  try {
    return new Blob([input], { type });
  } catch (e) {
    const BlobBuilder = window.BlobBuilder ||
    window.WebKitBlobBuilder ||
    window.MozBlobBuilder ||
    window.MSBlobBuilder;
    if (BlobBuilder) {
      const bb = new BlobBuilder();
      bb.append(input);
      return bb.getBlob(type);
    }
    return false;
  }
}
