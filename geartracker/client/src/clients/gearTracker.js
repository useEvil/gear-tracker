import axios from 'axios';

let Client;

function initGearTracker(baseURL = 'https://gear-tracker-1.herokuapp.com/api/v1', configHeaders = {}) {
  if (!Client) {
    Client = axios.create({
      baseURL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      ...configHeaders,
    })
  }
  return Client;
}

export default initGearTracker;
