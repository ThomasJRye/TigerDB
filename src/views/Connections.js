import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import ApiService from "../services/ApiService";
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

export const ConnectionsComponent = () => {
  const { user } = useAuth0();
  console.log(user);
  // const { Connections } = useQuery({
  //   queryFn: () => ApiService.getConnections(user),
  //   select: (data) => data.data,
  //   placeholderData: { data: {} },
  // });
  let connections = null
  useEffect((user, connections) => {
    connections = ApiService.getConnections(user);
  }, [user, connections]);

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
