import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  Button
} from 'react-bootstrap';


import { GalaxyJobs } from '../../components/GalaxyJobs/GalaxyJobs.jsx';
import NotificationArea from '../../components/NotificationArea/NotificationArea.jsx';
import GalaxyWorkflowJobList from '../../components/GalaxyJobs/GalaxyWorkflowJobList.jsx';

Enzyme.configure({ adapter: new Adapter() });
function setup() {
  const props = {
    selectedWorkflowId: "w_id1",
    workflowsList: [{
      id: "w_id1",
      name: "workflow1"
    }, {
      id: "w_id2",
      name: "workflow2"
    }],

    selectWorkflow: jest.fn(),
    requestJobsList: jest.fn(),
  };
  const enzymeWrapper = shallow(<GalaxyJobs {...props} />)

  return {
    props,
    enzymeWrapper
  }
}



describe('components', () => {
  describe('GalaxyJobs', () => {

    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup();

      // classes
      expect(enzymeWrapper.hasClass('galaxy')).toBe(true);
      expect(enzymeWrapper.find('section').hasClass('workflow-selector')).toBe(true);

      // Sub components
      expect(enzymeWrapper.find(NotificationArea).exists()).toBe(true);
      expect(enzymeWrapper.find(GalaxyWorkflowJobList).exists()).toBe(true);
      expect(enzymeWrapper.find(Button).exists()).toBe(true);


    });



    it('should call requestJobsList when reload button is clicked', () => {
      const { enzymeWrapper, props } = setup();

      enzymeWrapper.find(Button).simulate('click');
      expect(props.requestJobsList).toHaveBeenCalledTimes(1);
      expect(props.requestJobsList).toHaveBeenCalledWith(props.selectedWorkflowId);

    });

  });
});
