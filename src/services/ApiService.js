import axios from 'axios';
import { Globals } from '../Globals'
// Function to securely communicate with API

const getAuthToken = async (getAccessTokenSilently) => {
    try {
        const token = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH0_CLIENT_ID,
            scope: "read:current_user",
        });
        return token;
    } catch (error) {
        console.error("Error obtaining Auth0 access token:", error);
        return null;
    }
};


const ApiService = {
    getExternalApi: async () => {    
        return axios({ url: `${Globals.API_URL}external`, method: "GET" });
    },
    postUser: async (user, getAccessTokenSilently) => {
        const token = await getAuthToken(getAccessTokenSilently);
        return axios({ url: `${Globals.API_URL}postUser`, method: "POST", data: user, headers: { 'Authorization': `Bearer ${token}` } });
    },
    postConnection: async (connection, getAccessTokenSilently) => {
        const token = await getAuthToken(getAccessTokenSilently);
        return axios({ url: `${Globals.API_URL}postConnection`, method: "POST", data: connection, headers: { 'Authorization': `Bearer ${token}` } });
    },
    getConnections: async (getAccessTokenSilently) => {
        const token = await getAuthToken(getAccessTokenSilently);
        return axios({ 
            url: `${Globals.API_URL}db-connection`, 
            method: "GET", 
            headers: { 'Authorization': `Bearer ${token}` }
        });
    }
}
export default ApiService;
