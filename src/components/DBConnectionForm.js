import React, { useState } from "react";
import ApiService from "../services/ApiService";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";


// form for connecting to a database
const DBConnectionForm = () => {
    const [name, setName] = useState("");
    const [host, setHost] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [database, setDatabase] = useState("");
    const [port, setPort] = useState("");
    const { user } = useAuth0();
    const { getAccessTokenSilently,isAuthenticated } = useAuth0();

    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const getToken = async () => {
        try {
            if (isAuthenticated) {
            const token = await getAccessTokenSilently();
            setAccessToken(token);
            // You can now use this token to make authenticated requests.
            }
        } catch (error) {
            console.error("Error getting access token", error);
        }
        };

        getToken();
    }, [isAuthenticated, getAccessTokenSilently]);

    // handle submit
    const handleSubmit = (event) => {
        event.preventDefault();
        // put information into an object
        const connectionInfo = {
            host: host,
            database: database,
            port: port,
            username: username,
            password: password,
            user: 1

        };
        ApiService.addDB(getAccessTokenSilently, connectionInfo);

    };
    if (isAuthenticated) {
        return (
            <form onSubmit={handleSubmit}>
                <label>
                    Host:
                    <input 
                        type="text" 
                        value={host} 
                        onChange={(e) => setHost(e.target.value)} 
                    />
                </label>
                <label>
                    Port:
                    <input 
                        type= "text" 
                        value={port} 
                        onChange={(e) => setPort(e.target.value)} 
                        />
                </label>
                <label>
                    Database:
                    <input 
                        type="text" 
                        value={database} 
                        onChange={(e) => setDatabase(e.target.value)} 
                    />
                </label>
                <label>
                    Username:
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </label>

                <label>
                    Password:
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </label>
                <input type="submit" value="Connect" />
            </form>
        );
    } else {
        return (
            <div>
                <h1>Log in to connect to a database</h1>
            </div>
        );
    }
};

export default DBConnectionForm;
