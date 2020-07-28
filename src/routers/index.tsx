import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import styled from 'styled-components';

import devices from 'assets/devices';

import NavBar from 'components/NavBar';
import Banner from 'components/Banner';
import Footer from 'components/Footer';

import Home from 'pages/Home';

const Container = styled.main`
  margin: 0 auto;
  width: 50%;

  @media ${devices.laptopL} {
    width: 80%;
  }

  @media ${devices.laptop} {
    width: 90%;
  }
`;

const Root = () => (
  <BrowserRouter>
    <NavBar />
    <Banner />

    <main>
      <Container>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </Container>
    </main>

    <Footer />
  </BrowserRouter>
)

export default Root;