// src/Screens/ApiDetailsScreens/ApiDetailsScreen.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

interface ApiDetails {
  info: {
    title: string;
    description: string;
  };
  paths: Record<string, any>;
}

const ApiDetailsScreen: React.FC = () => {
  const { provider } = useParams<{ provider: string }>();
  const [apiDetails, setApiDetails] = useState<any>(null);

  useEffect(() => {
    // Ensure provider and apiName are defined before making the API request
    if (provider && !apiDetails) {
      axios
        .get(`https://api.apis.guru/v2/${provider}.json`)
        .then((response) => {
          if (response.data)
            setApiDetails(Object.values(response.data?.apis)[0]);
          else {
            console.error(`API with name not found.`);
          }
        })
        .catch((error) => console.error(error));
    } else {
      console.error("Provider or API name is undefined.");
    }
  }, [provider]);

  if (!apiDetails) return <Loading>Loading...</Loading>;

  return (
    <Container>
      <Title>{apiDetails.info.title}</Title>
      <Description>{apiDetails.info.description}</Description>
      {/* <h3>Available Endpoints:</h3>
      <ApiEndpoints>
          <Endpoint key={path}>
            <strong>{path}</strong>
            <pre>{JSON.stringify(apiDetails.paths[path], null, 2)}</pre>
          </Endpoint>
      </ApiEndpoints> */}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #add8e6;
`;

const Title = styled.h1`
  font-size: 2rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
`;

const ApiEndpoints = styled.div`
  margin-top: 20px;
`;

const Endpoint = styled.div`
  margin-bottom: 20px;
`;

const Loading = styled.div`
  padding: 20px;
  font-size: 1.5rem;
`;

export default ApiDetailsScreen;
