import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router'
import { renderRoutes } from 'react-router-config';

import Menu from './Menu/Menu.jsx';
import Footer from './Footer/Footer.jsx';

import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';

class App extends Component {

  render() {
    return (
      <Fragment>
        <Menu />
        {renderRoutes(this.props.route.routes)}
        <Footer />
      </Fragment>
    );
  }
}


export default withRouter(App);
