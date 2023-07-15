import axios from 'axios';
import { Globals } from '../Globals'

const ApiService = {
    getExternalApi: async () => {    
        return axios({ url: `${Globals.API_URL}external`, method: "GET" });
    },
    putUser: async (user) => {
        return axios({ url: `${Globals.API_URL}putUser`, method: "POST", data: user });
    },
    putData: async (key, data) => {
        return axios({ url: `${Globals.API_URL}putData/${key}`, method: "PUT", data: JSON.stringify(data), headers: {
            'Content-Type': 'application/json',
        } });
    }
}
export default ApiService