import axios from 'axios';
import { Globals } from '../Globals'
import { useAuth0 } from "@auth0/auth0-react";


const getAuthToken = async (getAccessTokenSilently) => {
    
    try {
        const token = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH0_CLIENT_ID,
            scope: "read:current_user",
        });
        console.log(token);
        return token;
    } catch (error) {
        console.error("Error obtaining Auth0 access token:", error);
        return null;
    }
};

const ApiService = {
    setAccessToken: async (getAccessTokenSilently) => {
        try {
            
            const token = await getAuthToken(getAccessTokenSilently);
            return axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error) {
            console.error("Error setting access token:", error);
        }
    },
    addDB: async (getAccessTokenSilently, connectionInfo) => {
        try {
            const token = await getAuthToken(getAccessTokenSilently);
            return axios({ 
                url: `${Globals.API_URL}add_db`, 
                method: "POST", 
                data: connectionInfo,
                headers: { 'authorization': `Bearer ${token}` } // Use the token for authentication
            });
        } catch (error) {
            console.error("Error adding database:", error);
            throw error;
        }
    },
    getDBs: async (getAccessTokenSilently, user) => {
        try {
            const token = await getAuthToken(getAccessTokenSilently);
            return axios({
                url: `${Globals.API_URL}get_dbs`,
                method: "POST",
                data: user,
                headers: { 'authorization': `Bearer ${token}` } // Use the token for authentication
            });
        } catch (error) {
            console.error("Error getting databases:", error);
            throw error;
        }
    },
    getDB: async (getAccessTokenSilently, id) => {
        try {
            const token = await getAuthToken(getAccessTokenSilently);
            return axios({
                url: `${Globals.API_URL}get_db/${id}`,
                method: "GET",
                headers: { 'authorization': `Bearer ${token}` } // Use the token for authentication
            });
        } catch (error) {
            console.error("Error getting database by ID:", error);
            throw error;
        }
    },
    postUser: async (getAccessTokenSilently, user) => {
        try {
            const token = await getAuthToken(getAccessTokenSilently);
            return axios({
                url: `${Globals.API_URL}post_user`,
                method: "POST",
                data: user,
                headers: { 'authorization': `Bearer ${token}` } // Use the token for authentication
            });
        } catch (error) {
            console.error("Error posting user:", error);
            throw error;
        }
    },
    checkUserExists: async (userId, getAccessTokenSilently) => {
        try {
          const token = await getAuthToken(getAccessTokenSilently);
          return axios({
            url: `${Globals.API_URL}check_user_exists/${userId}`, // Replace with your actual API endpoint
            method: "GET",
            headers: { 'authorization': `Bearer ${token}` } // Use the token for authentication
          });
        } catch (error) {
          console.error("Error checking user existence:", error);
          throw error;
        }
      }
}

export default ApiService;
