import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Footer, Header, Main } from '../components';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <Header  />
        <Container tag="main">
          <Main></Main>
        </Container>
        <Footer />
      </div>
    );
  }
}
