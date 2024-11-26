import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeScreen: React.FC = () => {
  const [providers, setProviders] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showProvidersOpen, setShowProvidersOpen] = useState<boolean>(false);

  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const fetchProviders = () => {
    setLoading(true);
    axios
      .get('https://api.apis.guru/v2/providers.json')
      .then((response) => {
        setProviders(response.data?.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching providers:', error);
        setLoading(false);
      });
  };

  const handleShowProviders = () => {
    setShowProvidersOpen((prevState) => !prevState);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setShowProvidersOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      fetchProviders();
    };
  }, []);

  if (loading) return <LoadingMessage>Loading providers...</LoadingMessage>;
  if (!providers || providers.length === 0)
    return <ErrorMessage>No providers found</ErrorMessage>;

  return (
    <Container>
      <Sidebar ref={sidebarRef} className={showProvidersOpen ? "open" : "closed"}>
        <h1>API Providers</h1>
        <ProviderList>
          {providers.map((provider) => (
            <ProviderItem key={provider}>
              <Link to={`/api-details/${provider}`}>
                <ProviderName>{provider}</ProviderName>
              </Link>
            </ProviderItem>
          ))}
        </ProviderList>
      </Sidebar>

      <CenterContent className={showProvidersOpen ? "open" : "closed"}>
        <Button ref={buttonRef} onClick={handleShowProviders} disabled={showProvidersOpen} className={showProvidersOpen ? "disabled" : ""} >
          {"Show Providers"}
        </Button>
      </CenterContent>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  position: relative;
  height: 100vh;
  justify-content: center;
  align-items: center;
  overflow: hidden; 
`;

const CenterContent = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 10; 
  &.open{
  background-color:#000000;

  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #0096FF;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  border-radius: 5px;
  margin-top: 20px;
  z-index: 20; 

  &:hover {
    background-color: #0000FF;
  }
    &.disabled{
    background-color:	#808080 ;
    opacity:0.5;
    cursor: not-allowed

    }
`;

const LoadingMessage = styled.div`
  font-size: 1.5rem;
  padding: 20px;
`;

const ErrorMessage = styled.div`
  font-size: 1.5rem;
  color: red;
  padding: 20px;
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0; 
  width: 300px;
  height: 100%;
  background-color: #333;
  color: white;
  padding: 20px;
  transition: right 0.3s ease; 
  z-index :100;
  
  &.open {
  transform:translateY(0)
  }

  &.closed {
  transform:translateY(100%)
  }
`;

const ProviderList = styled.div`
  margin-top: 20px;
`;

const ProviderItem = styled.div`
  margin-bottom: 15px;
`;

const ProviderName = styled.h2`
  font-size: 1rem;
`;

export default HomeScreen;
