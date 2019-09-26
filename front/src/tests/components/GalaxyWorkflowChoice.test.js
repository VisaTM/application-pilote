import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  FormControl,
} from 'react-bootstrap';


import { GalaxyWorkflowChoice } from '../../components/GalaxyWorkflowManager/GalaxyWorkflowChoice.jsx';

Enzyme.configure({ adapter: new Adapter() });
function setup() {
  const props = {
    workflowsList: [{
      id: 'w_id',
      name: 'My workflow'
    }],

    selectWorkflow: jest.fn()
  }

  const enzymeWrapper = mount(<GalaxyWorkflowChoice {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('GalaxyWorkflowChoice', () => {


    it('should render self and subcomponents', () => {
      const { enzymeWrapper, props } = setup();

      // Sub components
      expect(enzymeWrapper.find(FormControl).exists()).toBe(true);
      expect(enzymeWrapper.find('select').exists()).toBe(true);

      // Content
      expect(enzymeWrapper.find('option').at(1).text()).toBe(props.workflowsList[0].name)


    });

    it('should call selectWorkflow when onChange on select is triggered', () => {
      const { enzymeWrapper, props } = setup();
      const event = {target: { value: "w_id"}};

      enzymeWrapper.find('select').simulate('change', event);
      expect(props.selectWorkflow).toHaveBeenCalledTimes(1);
      expect(props.selectWorkflow).toHaveBeenCalledWith("w_id");

    });


  });
});
