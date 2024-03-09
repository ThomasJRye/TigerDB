import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import ApiService from "../services/ApiService";
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import example_json from "../example_db.json"

export const ConnectionsComponent = () => {
  const { user } = useAuth0();
  console.log(user);
  const { getAccessTokenSilently } = useAuth0();

  const { Connections } = useQuery({
    queryFn: () => ApiService.getConnections(user),
    select: (data) => data.data,
    placeholderData: { data: {} },
  });

  console.log(Connections);
  let connections = null
  useEffect((user, connections) => {
    connections = ApiService.getConnections(user, getAccessTokenSilently);
  }, [user, connections, getAccessTokenSilently]);

  console.log(connections)
  return (
    <Container className="mb-5">
        <h1>components</h1>
    </Container>
  );
};

export default withAuthenticationRequired(ConnectionsComponent, {
  onRedirecting: () => <Loading />,
});
