import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactEcharts from 'echarts-for-react';


import { ClusterChart } from '../../components/ECharts/ClusterChart.jsx';

Enzyme.configure({ adapter: new Adapter() });
function setup() {
  const props = {
    chartOptions: {},
    selectedRange: 0.2,

    selectRange: jest.fn()
  }

  const enzymeWrapper = shallow(<ClusterChart {...props} />)

  return {
    props,
    enzymeWrapper
  }
}




describe('Footer', () => {
  describe('ClusterChart', () => {

    it('should render self and subcomponents', () => {
      const { enzymeWrapper, props } = setup();

      //classes
      expect(enzymeWrapper.hasClass("kmeans-chart")).toBe(true);
      expect(enzymeWrapper.find("input").hasClass("range-selector")).toBe(true);

      // Sub components
      expect(enzymeWrapper.find(ReactEcharts).exists()).toBe(true);
      expect(enzymeWrapper.find(".range-selector").prop('value')).toBe(props.selectedRange);

    });


    it('should call selectRange when range selector value is changed', () => {
      const { enzymeWrapper, props } = setup();
      const event = { target : { value: 0.2 } }

      enzymeWrapper.find(".range-selector").simulate('change', event);
      expect(props.selectRange).toHaveBeenCalledWith(event.target.value);

    });



  });
});
