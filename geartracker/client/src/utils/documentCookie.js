class DocumentCookie {
  static setCookie = (name, value, daysToExpire) => {
    const d = new Date();
    d.setTime(d.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString() + ';';
    document.cookie = name + '=' + value + ';' + expires + 'path=/;';
  };

  static getCookie = (name) => {
    const cookieName = name + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');

    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(cookieName) === 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  };

  static deleteCookie = (name) => {
    const expires = 'expires=' + new Date(0).toUTCString() + ';';
    document.cookie = name + '=;' + expires + 'path=/;'
  };
}

export default DocumentCookie;
