import React, { useState } from "react";
import ApiService from "../services/ApiService";

const DBConnectionForm = () => {
    const [host, setHost] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [database, setDatabase] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // put information into an object
        const connectionInfo = {
            host: host,
            username: username,
            password: password,
            database: database
        };

        //send information to postConnection in ApiService
        ApiService.postConnection(connectionInfo);
    };

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

            <label>
                Database:
                <input 
                    type="text" 
                    value={database} 
                    onChange={(e) => setDatabase(e.target.value)} 
                />
            </label>

            <input type="submit" value="Connect" />
        </form>
    );
};

export default DBConnectionForm;
