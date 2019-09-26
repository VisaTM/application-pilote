import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Sticky from 'react-sticky-el';
import {
  Navbar,
  Nav,
  NavItem
} from 'react-bootstrap';


import Menu from '../../components/Menu/Menu.jsx';


Enzyme.configure({ adapter: new Adapter() });
function setup() {
  const props = {}

  const enzymeWrapper = shallow(<Menu {...props} />)

  return {
    props,
    enzymeWrapper
  }
}


describe('components', () => {
  describe('Menu', () => {

    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup();

      // Sub components
      expect(enzymeWrapper.find(Sticky).exists()).toBe(true);
      expect(enzymeWrapper.find(Navbar).exists()).toBe(true);
      expect(enzymeWrapper.find(Nav).exists()).toBe(true);
      expect(enzymeWrapper.find(NavItem).exists()).toBe(true);
      expect(enzymeWrapper.find(NavItem)).toHaveLength(5);

      // content
      expect(enzymeWrapper.find(NavItem).at(0).render().text()).toBe("Accueil");
      expect(enzymeWrapper.find(NavItem).at(1).render().text()).toBe("Télécharger un fichier");
      expect(enzymeWrapper.find(NavItem).at(2).render().text()).toBe("Lancer un workflow");
      expect(enzymeWrapper.find(NavItem).at(3).render().text()).toBe("Résultats");
      expect(enzymeWrapper.find(NavItem).at(4).render().text()).toBe("Créer son Corpus avec ISTEX");

    });
  });
});
