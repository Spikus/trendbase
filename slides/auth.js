


const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/presentations.readonly','https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = 'token.json';
const CREDENT_PATH = 'credentials.json';

const PromiseRead = (path) => new Promise((resolve, reject) => fs.readFile(path , (err, content) => {
    if (err) {
        reject(err)
    } else {
        resolve(content)
    }
}));
    
const getToken = async () => { 
    const CredContent = await PromiseRead(CREDENT_PATH);
    const { client_secret, client_id, redirect_uris } =JSON.parse(CredContent).installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    
    try {
        const token = await PromiseRead(TOKEN_PATH);
        oAuth2Client.setCredentials(JSON.parse(token));
        
        return oAuth2Client;
    } catch(err) {
        getNewToken(oAuth2Client);
        return ({err})
    }
}


/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
        });
    });
}

export default ({
    getToken
});