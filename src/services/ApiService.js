import axios from 'axios';
import { Globals } from '../Globals'

const ApiService = {
    getExternalApi: async () => {    
        return axios({ url: `${Globals.API_URL}external`, method: "GET" });
    },
    putUser: async (user) => {
        return axios({ url: `${Globals.API_URL}putUser`, method: "PUT", data: user });
    }
}
export default ApiService