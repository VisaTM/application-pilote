import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import { GalaxyWorkflowResult } from '../../components/GalaxyWorkflowResult/GalaxyWorkflowResult.jsx';

import NotificationArea from '../../components/NotificationArea/NotificationArea.jsx';
import ClusterChart from '../../components/ECharts/ClusterChart.jsx'
import BarChart from '../../components/ECharts/BarChart.jsx'
import DocumentsList from '../../components/ECharts/DocumentsList.jsx'
import DocumentModal from '../../components/ECharts/DocumentModal.jsx'

Enzyme.configure({ adapter: new Adapter() });
function setup() {
  const props = {
    jobResult: {},
    match: {
      params: {
        resultId: "2a56795cad3c7db3"
      }
    },

    requestJobResult: jest.fn(),
  }

  const enzymeWrapper = shallow(<GalaxyWorkflowResult {...props} />)

  return {
    props,
    enzymeWrapper
  }
}



describe('components', () => {
  describe('GalaxyWorkflowResult', () => {

    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup()
      // Sub components
      expect(enzymeWrapper.find(NotificationArea).exists()).toBe(true);
      expect(enzymeWrapper.find(ClusterChart).exists()).toBe(true);
      expect(enzymeWrapper.find(BarChart).exists()).toBe(true);
      expect(enzymeWrapper.find(DocumentsList).exists()).toBe(true);
      expect(enzymeWrapper.find(DocumentModal).exists()).toBe(true);

      // classes
      expect(enzymeWrapper.find('main').hasClass('job-result')).toBe(true);
      expect(enzymeWrapper.find('div').at(0).hasClass('kmeans-visu')).toBe(true);
      expect(enzymeWrapper.find('div').at(1).hasClass('document-list')).toBe(true);


    });

    it('should call requestJobResult when component has mounted', () => {
      const { props } = setup()
      expect(props.requestJobResult).toHaveBeenCalledTimes(1)
      expect(props.requestJobResult).toHaveBeenCalledWith(props.match.params.resultId);


    });

  });
});

