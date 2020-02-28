import axios from 'axios';

let Client;

function initGearTracker(baseURL = '/api/v1', configHeaders = {}) {
  if (!Client) {
    Client = axios.create({
      baseURL: process.env.REACT_APP_API,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      ...configHeaders,
    })
  }
  return Client;
}

export function setHeaders(header, value) {
  Client.defaults.headers.common[header] = value;
}

export default initGearTracker;
