import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  RECEIVE_SOURCES_DATA_SUCCESS,
  RECEIVE_SELECT_SOURCE_SUCCESS,

  REQUEST_BAR_CHART_UPDATE,

  REQUEST_DOCUMENTS_FILTERING
} from '../../constants';
import SourcesActions from '../../actions/SourcesActions';


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore({
  sources: {
    list: [],
    selected: {}
  },
  clusters: {
    selected: {}

  },
  charts: {
    chartType: "sources"
  }
});

describe('actions', () => {
  describe('sources', () => {
    beforeEach(() => {
      store.clearActions()
    });

    it('creates a RECEIVE_SOURCES_DATA_SUCCESS when fetching sources list has been done', () => {
      const mockSourcesList = [
        {
          Title: "Water Resources Research",
          Label: "Water Resources Research",
        },
        {
          Title: "Journal of Geophysical Research: Solid Earth",
          Label: "Journal of Geophysical Research: Solid Earth",
        }
      ];;

      const expectedActions = [
        { type: RECEIVE_SOURCES_DATA_SUCCESS, sources: mockSourcesList },
      ];

      store.dispatch(SourcesActions.receiveSourcesData(mockSourcesList));
      expect(store.getActions()).toEqual(expectedActions);

    });



    it('creates a RECEIVE_SELECT_SOURCE_SUCCESS when selecting a source', () => {
      const mockSelectedSourceId = 0;

      const expectedActions = [
        { type: RECEIVE_SELECT_SOURCE_SUCCESS, sourceId: mockSelectedSourceId, selectedCluster: {} },
        { type: REQUEST_BAR_CHART_UPDATE, chartData: [], selectedId: mockSelectedSourceId, title: "Sources", chartType: "sources", selectedCluster: {} },
        { type: REQUEST_DOCUMENTS_FILTERING, referencesList: undefined }
      ];

      store.dispatch(SourcesActions.selectSource(mockSelectedSourceId));
      expect(store.getActions()).toEqual(expectedActions);

    });

  });

});
