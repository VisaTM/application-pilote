import React from 'react';
import {
  Navbar,
  Nav,
  NavItem
} from 'react-bootstrap';
import {
  FaTwitter,
  FaLink
} from 'react-icons/fa';
import './Footer.scss';

const Footer = props => (
  <footer>
    <Navbar inverse collapseOnSelect>
      <Nav pullLeft>
        <NavItem eventKey={1} href="http://www.enseignementsup-recherche.gouv.fr/"><img src="/logos/mesr.jpg" alt="mesr-logo" /></NavItem>
        <NavItem eventKey={2} href="http://www.cnrs.fr/"><img src="/logos/cnrs.svg" alt="cnrs-logo" /></NavItem>
        <NavItem eventKey={3} href="http://www.inra.fr/"><img src="/logos/inra.gif" alt="inra-logo" /></NavItem>
        <NavItem eventKey={4} href="https://www.ouvrirlascience.fr/"><img src="/logos/openscience.png" alt="coso-logo" /></NavItem>
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={1} href="https://www.twitter.com"><FaTwitter className="icon" /></NavItem>
        <NavItem eventKey={2} href="https://visatm.inist.fr/"><FaLink className="icon" /></NavItem>
      </Nav>
    </Navbar>
  </footer>
);

export default Footer;
