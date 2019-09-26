import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  REQUEST_CLUSTER_CHART_UPDATE,
  REQUEST_BAR_CHART_UPDATE
} from '../../constants';
import ChartsActions from '../../actions/ChartsActions';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  clusters: {
    list: [],
    links: [],
    selected: {},
    selectedRange: 0
  },
  terms: {
    list: []
  },
  sources: {
    list: []
  }

});


describe('actions', () => {
  describe('workflows', () => {
    beforeEach(() => {
      store.clearActions()
    });

    it('creates a REQUEST_CLUSTER_CHART_UPDATE with store cluster data, when requesting a cluster chart update', () => {
      const expectedActionData = {
        chartData: [],
        linksData: [],
        selectedCluster : {},
        selectedRange: 0
      }
      const expectedActions = [
        { type: REQUEST_CLUSTER_CHART_UPDATE, ...expectedActionData }
      ];

      store.dispatch(ChartsActions.updateClusterChart());
      expect(store.getActions()).toEqual(expectedActions);

    });

    it('creates a REQUEST_BAR_CHART_UPDATE for terms when requesting to update the terms chart', () => {
      const mockTermId = 'myterm'
      const expectedActionData = {
        chartType: 'terms',
        chartData: [],
        selectedCluster: {},
        selectedId: mockTermId,
        title: "Terms"
      }
      const expectedActions = [
        { type: REQUEST_BAR_CHART_UPDATE, ...expectedActionData }
      ];

      store.dispatch(ChartsActions.updateTermsChart(mockTermId));
      expect(store.getActions()).toEqual(expectedActions);

    });

    it('creates a REQUEST_BAR_CHART_UPDATE for sources when requesting to update the sources chart', () => {
      const mockSourceId = 'mysource'
      const expectedActionData = {
        chartType: 'sources',
        chartData: [],
        selectedCluster: {},
        selectedId: mockSourceId,
        title: "Sources"
      }
      const expectedActions = [
        { type: REQUEST_BAR_CHART_UPDATE, ...expectedActionData }
      ];

      store.dispatch(ChartsActions.updateSourcesChart(mockSourceId));
      expect(store.getActions()).toEqual(expectedActions);

    });



    it('creates a REQUEST_BAR_CHART_UPDATE for terms when requesting to update the terms chart', () => {
      const mockTermId = 'myterm'
      const expectedActionData = {
        chartType: 'terms',
        chartData: [],
        selectedCluster: {},
        selectedId: mockTermId,
        title: "Terms"
      }
      const expectedActions = [
        { type: REQUEST_BAR_CHART_UPDATE, ...expectedActionData }
      ];

      store.dispatch(ChartsActions.updateTermsChart(mockTermId));
      expect(store.getActions()).toEqual(expectedActions);

    });



    it('creates a REQUEST_BAR_CHART_UPDATE for terms chart when choosing the terms chart ', () => {
      const expectedActionData = {
        chartType: 'terms',
        chartData: [],
        selectedCluster: {},
        selectedId: undefined,
        title: "Terms"
      }
      const expectedActions = [
        { type: REQUEST_BAR_CHART_UPDATE, ...expectedActionData }
      ];

      store.dispatch(ChartsActions.chooseBarChart('terms'));
      expect(store.getActions()).toEqual(expectedActions);

    });

    it('creates a REQUEST_BAR_CHART_UPDATE for sources chart when choosing the sources chart ', () => {
      const expectedActionData = {
        chartType: 'sources',
        chartData: [],
        selectedCluster: {},
        selectedId: undefined,
        title: "Sources"
      }
      const expectedActions = [
        { type: REQUEST_BAR_CHART_UPDATE, ...expectedActionData }
      ];

      store.dispatch(ChartsActions.chooseBarChart('sources'));
      expect(store.getActions()).toEqual(expectedActions);

    });

    it('creates a REQUEST_BAR_CHART_UPDATE for terms chart by default', () => {
      const expectedActionData = {
        chartType: 'terms',
        chartData: [],
        selectedCluster: {},
        selectedId: undefined,
        title: "Terms"
      }
      const expectedActions = [
        { type: REQUEST_BAR_CHART_UPDATE, ...expectedActionData }
      ];

      store.dispatch(ChartsActions.chooseBarChart());
      expect(store.getActions()).toEqual(expectedActions);

    });

  });
});
