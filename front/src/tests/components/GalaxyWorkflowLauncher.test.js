import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  Button
} from 'react-bootstrap';


import { GalaxyWorkflowLauncher } from '../../components/GalaxyWorkflowLauncher/GalaxyWorkflowLauncher.jsx';

import NotificationArea from '../../components/NotificationArea/NotificationArea.jsx';
import GalaxyWorkflowChoice from '../../components/GalaxyWorkflowManager/GalaxyWorkflowChoice.jsx';
import GalaxyWorkflowParameters from '../../components/GalaxyWorkflowManager/GalaxyWorkflowParameters.jsx';

Enzyme.configure({ adapter: new Adapter() });
function setup() {
  const props = {
    requestWorkflowExecution: jest.fn()
  };
  const enzymeWrapper = shallow(<GalaxyWorkflowLauncher {...props} />)

  return {
    props,
    enzymeWrapper
  }
}


describe('components', () => {
  describe('GalaxyWorkflowLauncher', () => {

    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup();

      // classes
      expect(enzymeWrapper.hasClass('galaxy')).toBe(true);

      // Sub components
      expect(enzymeWrapper.find(NotificationArea).exists()).toBe(true);
      expect(enzymeWrapper.find(GalaxyWorkflowParameters).exists()).toBe(true);
      expect(enzymeWrapper.find(GalaxyWorkflowChoice).exists()).toBe(true);
      expect(enzymeWrapper.find(Button).exists()).toBe(true);

      expect(enzymeWrapper.find(Button).prop("disabled")).toBe(true);

    });

    it('should enable the button with the right props', () => {
      const props = {
        selectedWorkflowId: "w_id",
        areFilesSelected: true,
        areParametersValid: true
      }
      const wrapper = shallow(<GalaxyWorkflowLauncher {...props} />);

      expect(wrapper.find(Button).prop("disabled")).toBe(false);

    });


    it('should call requestWorkflowExecution when clicking the button', () => {
      const { enzymeWrapper, props } = setup();

      enzymeWrapper.find(Button).simulate('click');
      expect(props.requestWorkflowExecution).toHaveBeenCalledTimes(1);

    });

  });
});


