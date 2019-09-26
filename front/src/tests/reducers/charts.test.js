import {
  REQUEST_CLUSTER_CHART_UPDATE,
  REQUEST_BAR_CHART_UPDATE
} from '../../constants';
import reducer from '../../reducers/charts';

import clusterChartOptions from '../../utils/clusterChartOptions';
import barChartOptions from '../../utils/barChartOptions';

const initialState = {
  clusterChartOptions: {},
  chartType: null,
  barChartOptions: {}
}


describe('reducers', () => {
  describe('charts', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    });

    it('should handle REQUEST_CLUSTER_CHART_UPDATE', () => {
      const mockChartData = [];
      const mockLinksData = [];
      const mockSelectedCluster = {};
      const mockSelectedRange = 0;

      // Workaround for the "Compared values have no visual difference" error
      expect(JSON.stringify(reducer(initialState, {
        type: REQUEST_CLUSTER_CHART_UPDATE,
        chartData: mockChartData,
        linksData: mockLinksData,
        selectedCluster: mockSelectedCluster,
        selectedRange: mockSelectedRange,
      }))).toEqual(JSON.stringify({
        ...initialState,
        clusterChartOptions: clusterChartOptions(mockChartData, mockLinksData, mockSelectedCluster, mockSelectedRange)
      }));
    });

    it('should handle REQUEST_BAR_CHART_UPDATE', () => {
      const mockChartData = [];
      const mockTitle = "funny title";
      const mockSelectedCluster = {};
      const mockSelectedId = "id";
      const mockChartType = "chart type";

      // Workaround for the "Compared values have no visual difference" error
      expect(JSON.stringify(reducer(initialState, {
        type: REQUEST_BAR_CHART_UPDATE,
        chartData: mockChartData,
        title: mockTitle,
        selectedCluster: mockSelectedCluster,
        selectedId: mockSelectedId,
        chartType: mockChartType
      }))).toEqual(JSON.stringify({
        ...initialState,
        chartType: mockChartType,
        barChartOptions: barChartOptions(mockChartData, mockTitle, mockSelectedCluster, mockSelectedId)
      }));
    });


  });

});
