import React from 'react';
import Sticky from 'react-sticky-el';
import {
  Navbar,
  Nav,
  NavItem
} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';
import './Menu.scss';

const Menu = props => (
  <header id="app-menu">
    <Sticky hideOnBoundaryHit={false} stickyClassName="sticky-menu">
      <Navbar collapseOnSelect>
        <Nav>
          {/*<NavItem eventKey={1} href="/graph">ECharts</NavItem>*/}
          <NavItem eventKey={1} href="/">Accueil</NavItem>
          <NavItem eventKey={2} href="/istex">Construire un corpus</NavItem>
          <NavItem eventKey={3} href="/files">Télécharger un fichier</NavItem>
          <NavItem eventKey={4} href="/extraction">Extraction</NavItem>
          <NavItem eventKey={5} href="/clustering">Clusterisation</NavItem>
          <NavItem eventKey={6} href="/jobs">Résultats</NavItem>
        </Nav>
      </Navbar>
    </Sticky>
  </header>
);

export default Menu;
