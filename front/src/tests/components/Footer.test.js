import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {
  Navbar,
  Nav,
  NavItem
} from 'react-bootstrap';



import Footer from '../../components/Footer/Footer.jsx';


Enzyme.configure({ adapter: new Adapter() });
function setup() {
  const props = {}

  const enzymeWrapper = shallow(<Footer {...props} />)

  return {
    props,
    enzymeWrapper
  }
}



describe('Footer', () => {
  describe('Menu', () => {

    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup();

      // Sub components
      expect(enzymeWrapper.find(Navbar).exists()).toBe(true);
      expect(enzymeWrapper.find(Nav).exists()).toBe(true);
      expect(enzymeWrapper.find(NavItem)).toHaveLength(6);


    });
  });
});

