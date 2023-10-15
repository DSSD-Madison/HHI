const CLIENT_ID = process.env.CLIENT_ID;
const API_KEY = process.env.API_KEY;

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';

let tokenClient;
let gapiInited = false;
let gisInited = false;

function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
  }
  async function getItems() {
    if(!gapiInited || !gisInited){
      return -1;
    }
    let response;
    try {
      // Fetch first 10 files
      response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1TI0WNrGsTKC_lZPXhcwxK4fHsc2-A88GysVtidI75z0',
        range: 'Stakeholder Submission Form!B:B',
      });
    } catch (err) {
      return -1;
    }
    const range = response.result;
    if (!range || !range.values || range.values.length == 0) {
      return -1;
    }
    // Flatten to string to display
    return range.values;

  }

  async function initializeGapiClient() {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
  }

  function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id : CLIENT_ID === undefined ? "" : CLIENT_ID ,
      scope: SCOPES,
      callback: ()=>{}, // defined later
    });
    gisInited = true;
  }


export {gisLoaded, gapiLoaded, getItems};