import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  RECEIVE_TERMS_DATA_SUCCESS,
  RECEIVE_SELECT_TERM_SUCCESS,

  REQUEST_BAR_CHART_UPDATE,

  REQUEST_DOCUMENTS_FILTERING
} from '../../constants';
import TermsActions from '../../actions/TermsActions';


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore({
  terms: {
    list: [],
    selected: {}
  },
  clusters: {
    selected: {}

  },
  charts: {
    chartType: "terms"
  }
})

describe('actions', () => {
  describe('terms', () => {
    beforeEach(() => {
      store.clearActions()
    });

    it('creates a RECEIVE_TERMS_DATA_SUCCESS when fetching terms list has been done', () => {
      const mockSelectedTermId = undefined;
      const mockTermsList = [
        {
          Term: "mathematical model",
          Reference: "003297",
          Weight: 1.001
        },
        {
          Term: "detailed examination",
          Reference: "001241",
          Weight: 1.001
        }
      ];

      const expectedActions = [
        { type: RECEIVE_TERMS_DATA_SUCCESS, terms: mockTermsList },
        { type: REQUEST_BAR_CHART_UPDATE, chartData: [], selectedId: mockSelectedTermId, title: "Terms", chartType: "terms", selectedCluster: {} }
      ];

      store.dispatch(TermsActions.receiveTermsData(mockTermsList));
      expect(store.getActions()).toEqual(expectedActions);

    });



    it('creates a RECEIVE_SELECT_TERM_SUCCESS when selecting a term', () => {
      const mockSelectedTermId = 0;

      const expectedActions = [
        { type: RECEIVE_SELECT_TERM_SUCCESS, termId: mockSelectedTermId, selectedCluster: {} },
        { type: REQUEST_BAR_CHART_UPDATE, chartData: [], selectedId: mockSelectedTermId, title: "Terms", chartType: "terms", selectedCluster: {} },
        { type: REQUEST_DOCUMENTS_FILTERING, referencesList: undefined }
      ];

      store.dispatch(TermsActions.selectTerm(mockSelectedTermId));
      expect(store.getActions()).toEqual(expectedActions);

    });

  });
});
