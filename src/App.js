import React, { useState, useEffect } from 'react';
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Home from "./views/Home";
import Connections from "./views/Connections";
import Profile from "./views/Profile";
import ExternalApi from "./views/ExternalApi";
import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";
import ApiService from './services/ApiService'; // import ApiService here
import "./App.css";
import DBInterface from './views/DBInterface';
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

const App = () => {
  const { getAccessTokenSilently, isLoading, error, user } = useAuth0();
  const [token, setToken] = useState(null);
  console.log("user", user);
  useEffect(() => {
    
    const getToken = async (user) => {
      try {
        const accessToken = await getAccessTokenSilently();
        setToken(accessToken);
        
        
        // Pass the accessToken to your API service for authentication
        ApiService.setAccessToken(getAccessTokenSilently);
        console.log("accessToken", accessToken);
        console.log("getAccessTokenSilently", getAccessTokenSilently);
        console.log("user", user);
        // Check if the user exists in the database
        const response = await ApiService.checkUserExists(user.sub, getAccessTokenSilently);
        console.log("user.sub", user);
        // If the user doesn't exist, create them
        if (!response.exists) {
          const userData = {
            identifier: user.sub,
            email: user.email
            // Include other user data if needed

          };

          await ApiService.postUser(getAccessTokenSilently, userData);
        }
      } catch (e) {
        console.error(e);
      }
    };

    getToken(user);
  }, [getAccessTokenSilently, user]);

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }
  

  

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="main" >
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/connections" component={Connections} />
            <Route path="/profile" component={Profile} />
            <Route path="/database/:id" component={DBInterface} />
          </Switch>
        </Container>
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App;
