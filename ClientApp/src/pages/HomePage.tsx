import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Header, Main } from '../components';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <Header  />
          <Main />
      </div>
    );
  }
}
