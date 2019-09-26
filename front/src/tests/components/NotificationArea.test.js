import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {
  Alert,
} from 'react-bootstrap';
import { FaWindowClose } from 'react-icons/fa';

import { NotificationArea } from '../../components/NotificationArea/NotificationArea.jsx';

Enzyme.configure({ adapter: new Adapter() });
function setup() {
  const props = {
    notificationMessage: "My notification message",
    notificationType: "danger",

    requestNotificationDismiss: jest.fn(),
  }

  const enzymeWrapper = shallow(<NotificationArea {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('NotificationArea', () => {


    it('should render self and subcomponents', () => {
      const { enzymeWrapper, props } = setup();

      // Sub components
      expect(enzymeWrapper.find(Alert).exists()).toBe(true);
      expect(enzymeWrapper.find(FaWindowClose).exists()).toBe(true);

      // classes
      expect(enzymeWrapper.find('section').hasClass('galaxy-notification')).toBe(true);
      expect(enzymeWrapper.find('span').hasClass('alert-message')).toBe(true);
      expect(enzymeWrapper.find('.close-button').exists()).toBe(true);

      // content
      expect(enzymeWrapper.find('span').text()).toBe(props.notificationMessage)

    });

    it('should not render an Alert if notificationMessage is empty', () => {
        const wrapper = shallow(<NotificationArea/>)

        /// Sub components
        expect(wrapper.find(Alert).exists()).toBe(false);
        expect(wrapper.find(FaWindowClose).exists()).toBe(false);


    });

    it('should call requestNotificationDismiss when clicking on the close button', () => {
      const { enzymeWrapper, props } = setup();
      //const spy = sinon.spy();

      enzymeWrapper.find('.close-button').simulate("click");
      expect(props.requestNotificationDismiss).toHaveBeenCalled()

    });

  });
});

