import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactTable from "react-table";

import { GalaxyWorkflowJobList } from '../../components/GalaxyJobs/GalaxyWorkflowJobList.jsx';


Enzyme.configure({ adapter: new Adapter() });
function setup() {
  const props = {
    selectedWorkflowId: "w_id",

    requestJobsList: jest.fn()
  };
  const enzymeWrapper = shallow(<GalaxyWorkflowJobList {...props} />)

  return {
    props,
    enzymeWrapper
  }
}


describe('components', () => {
  describe('GalaxyWorkflowJobList', () => {

    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup();

      // classes
      expect(enzymeWrapper.hasClass('workflow-jobs')).toBe(true);

      // SubComponents
      expect(enzymeWrapper.find(ReactTable).exists()).toBe(true);


    });



    it('should call requestJobsList when component has mounted', () => {
      const { props } = setup()
      expect(props.requestJobsList).toHaveBeenCalledTimes(1)

      expect(props.requestJobsList).toHaveBeenCalledWith(props.selectedWorkflowId)
    });

  });
});


