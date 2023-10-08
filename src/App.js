import React, { useEffect } from "react";
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
import { Auth0Provider } from "@auth0/auth0-react";
import "./App.css";

import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

const App = () => {
  const { isLoading, error, user } = useAuth0();
  console.log(user);
  useEffect(() => {
    if (user) {
      ApiService.postUser(user);
    }
  }, [user]);

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  
  return (
    <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        redirectUri={window.location.origin}
    >
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
          </Container>
          {/* <Footer /> */}
        </div>
      </Router>
    </Auth0Provider>
  );
};

export default App;