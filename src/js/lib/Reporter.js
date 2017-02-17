window.URL = window.webkitURL || window.URL;
window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;

export default function reporter(type, message) {
  if(!window.__GAME_REPORT__) {
    window.__GAME_REPORT__ = [];
  }
  window.__GAME_REPORT__.push({ type, message, ts: new Date().toISOString() });
}

function createBlob(input, type) {
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
    } else {
      return false;
    }
  }
}


export function generateReport() {
  let text = `---- GAME REPORT ----\nTYPE;DATE;MESSAGE;\n`;

  if (!window.__GAME_REPORT__) {
    window.__GAME_REPORT__ = [];
  }

  window.__GAME_REPORT__.map((object) => {
    if(!object){
      text += `OK!\n`;
      return text;
    }
    text += `${object.type.toUpperCase()};${object.ts};${object.message}\n`;
    return text;
  });

  const theBlob = createBlob(text, 'text/plain');
  if (theBlob) {
    let a = document.querySelector('#report-csv');
    if (!a) {
      a = window.document.createElement('a');
    }
    a.id = 'report-csv';
    a.href = window.URL.createObjectURL(theBlob);
    a.download = 'Report.csv';
    a.textContent = 'Download the Report.csv!';
    window.document.body.appendChild(a);
  }
  return text;
}
