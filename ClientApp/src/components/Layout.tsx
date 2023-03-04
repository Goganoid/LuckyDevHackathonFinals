import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Header from './Header';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <Header  />
        <Container tag="main">
          {this.props.children}
        </Container>
      </div>
    );
  }
}
