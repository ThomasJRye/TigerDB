import React from "react";
import { Container, Row, Col } from "reactstrap";

import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

export const ConnectionsComponent = () => {
  const { user } = useAuth0();
  console.log(user);

  return (
    <Container className="mb-5">
        <h1>components</h1>
    </Container>
  );
};

export default withAuthenticationRequired(ConnectionsComponent, {
  onRedirecting: () => <Loading />,
});
