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

import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

const App = () => {
  const { getAccessTokenSilently, isLoading, error, user } = useAuth0();
  const [token, setToken] = useState(null);


  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        setToken(accessToken);
      } catch (e) {
        console.error(e);
      }
    };

    getToken();
  }, [getAccessTokenSilently]);

  console.log(user);
  useEffect(() => {
    if (user && token) {
      ApiService.test(token);
    }
  }, [user, token]);
 
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
          <Container className="flex-grow-1 mt-5">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/connections" component={Connections} />
              <Route path="/profile" component={Profile} />
              <Route path="/external-api" component={ExternalApi} />
            </Switch>
            <div>
            <h1>GET Request Example</h1>
            
          </div>
          </Container>
          {/* <Footer /> */}
        </div>
      </Router>
  );
};

export default App;