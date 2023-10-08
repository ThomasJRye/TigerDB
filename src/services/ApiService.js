import axios from 'axios';
import { Globals } from '../Globals'
import { useAuth0 } from "@auth0/auth0-react";

// Function to securely communicate with API

const getAuthToken = async (getAccessTokenSilently) => {
    try {
        const token = await getAccessTokenSilently({
            audience: "YOUR_API_IDENTIFIER",
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
    postUser: async (user) => {
        return axios({ url: `${Globals.API_URL}postUser`, method: "POST", data: user, headers: { 'Content-Type': 'application/json' } });
    },
    postConnection: async (connection) => {
        return axios({ url: `${Globals.API_URL}postConnection`, method: "POST", data: connection, headers: { 'Content-Type': 'application/json' } });
    },
    // returns the list of connection owned by the user
    getConnections: async ( user ) => {
        const token = await getAuthToken();  // replace with your method to get Auth0 token
        return axios({ 
            url: `${Globals.API_URL}db-connection`, 
            method: "GET", 
            params: { user: user },
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'User': JSON.stringify(user)
            }
        });
    }
    
    
}
export default ApiService