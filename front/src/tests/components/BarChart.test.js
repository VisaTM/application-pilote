import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactEcharts from 'echarts-for-react';


import { BarChart } from '../../components/ECharts/BarChart.jsx';

Enzyme.configure({ adapter: new Adapter() });
function setup() {
  const props = {
    chartOptions: {},
    chartType: "terms",

    chooseChart: jest.fn(),
    selectTerm: jest.fn(),
    selectSource: jest.fn()
  }

  const enzymeWrapper = shallow(<BarChart {...props} />)

  return {
    props,
    enzymeWrapper
  }
}




describe('Footer', () => {
  describe('BarChart', () => {

    it('should render self and subcomponents', () => {
      const { enzymeWrapper, props } = setup();

      //classes
      expect(enzymeWrapper.hasClass("kmeans-chart")).toBe(true);
      expect(enzymeWrapper.find('button')).toHaveLength(2);

      // Sub components
      expect(enzymeWrapper.find(ReactEcharts).exists()).toBe(true);

    });

    it('should call chooseChart when clicking a button for choosing one of the chart', () => {
      const { enzymeWrapper, props } = setup();
      const event = { target : { value: "terms" } }

      enzymeWrapper.find('button[value="terms"]').simulate('click', event);
      expect(props.chooseChart).toHaveBeenCalledWith("terms");
    });



  });
});
