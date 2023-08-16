import axios from 'axios';
import { Globals } from '../Globals'

const ApiService = {
    getExternalApi: async () => {    
        return axios({ url: `${Globals.API_URL}external`, method: "GET" });
    },
    postUser: async (user) => {
        return axios({ url: `${Globals.API_URL}postUser`, method: "POST", data: user, headers: { 'Content-Type': 'application/json' } });
    },
    postConnection: async (connection) => {
        return axios({ url: `${Globals.API_URL}postConnection`, method: "POST", data: connection, headers: { 'Content-Type': 'application/json' } });
    }
    
    
}
export default ApiService