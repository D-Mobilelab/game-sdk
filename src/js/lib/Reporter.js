import createBlob from './CreateBlob';

class Reporter {
  constructor() {
    this.__GAME_REPORT__ = [];
    window.__GAME_REPORT__ = this.__GAME_REPORT__;
  }

  /**
   * generateReport
   * @returns {string} the csv format report
   */
  generateReport() {
    let text = '---- GAME REPORT ----\nTYPE;DATE;MESSAGE;\n';

    this.__GAME_REPORT__.map((object) => {
      if (!object) {
        text += 'OK!\n';
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

      if (document.createEvent) {
        const evt = document.createEvent('MouseEvents');
        evt.initEvent('click', true, false);
        a.dispatchEvent(evt);
      } else if (document.createEventObject) {
        a.fireEvent('onclick');
      } else if (typeof a.onclick === 'function') {
        a.onclick();
      }
      // window.document.body.appendChild(a);
    }
    return text;
  }

  /**
   * add
   * @param {string} type - error, warn
   * @param {string} message - the error description
   * @returns {array} the game report at that time
   */
  add(type, message) {
    this.__GAME_REPORT__.push({ type, message, ts: new Date().toISOString() });
    return this.__GAME_REPORT__;
  }
}

const reporterInstance = new Reporter();
export default reporterInstance;
