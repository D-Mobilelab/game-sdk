/**
 * 
 * Read the cookies in document.cookie
 *  
 * @param {string} cookies - the document.cookie string in this format key=val;
 * @returns {object}
 */
export default function readCookies(cookies) {
  const strippedCookies = cookies.replace(/\s/g, '');
  return strippedCookies.split(';').reduce((prev, current) => {
    const [key, val] = current.split('=');
    prev[key] = val;
    return prev;
  }, {});
}
