import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import {
  REQUEST_WORKFLOW_JOBS,
  RECEIVE_WORKFLOW_JOBS_SUCCESS,

  REQUEST_JOB_RESULT,

  REQUEST_CLUSTERS_DATA,
  RECEIVE_CLUSTERS_DATA_SUCCESS,
  REQUEST_CLUSTER_CHART_UPDATE
} from '../../constants';
import JobsActions from '../../actions/JobsActions';

const GALAXY_API_URL = process.env.REACT_APP_GALAXY_API;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  clusters: {
    list: [],
    links: [],
    selected: {},
    selectedRange: 0
  }
});


describe('actions', () => {
  describe('workflows', () => {
    beforeEach(() => {
      store.clearActions()
    });
    afterEach(() => {
      fetchMock.restore()
    });


    it('creates a RECEIVE_WORKFLOW_JOBS_SUCCESS when fetching jobs for all workflows', () => {
      const mockJobs = [
        {
          id: "f2db41e1fa331b3e",
          state: "ok",
          workflow_id: "f2db41e1fa331b3e"
        },
        {
          id: "2a56795cad3c7db3",
          state: "running",
          workflow_id: "2a56795cad3c7db3"
        },
      ];

      fetchMock.getOnce(`${GALAXY_API_URL}/workflows/jobs`, {
        body: mockJobs,
        headers: { 'content-type': 'application/json' }
      });

      const expectedActions = [
        { type: REQUEST_WORKFLOW_JOBS, workflowId: null },
        { type: RECEIVE_WORKFLOW_JOBS_SUCCESS, jobsList: mockJobs }
      ];

      return store.dispatch(JobsActions.requestJobsList(null)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });


    it('creates a RECEIVE_WORKFLOW_JOBS_SUCCESS when fetching jobs for a given workflow', () => {
      const mockWorkflowId = "f2db41e1fa331b3e";
      const mockJobs = [
        {
          id: "f2db41e1fa331b3e",
          state: "ok",
          workflow_id: "f2db41e1fa331b3e"
        },
      ];

      fetchMock.getOnce(`${GALAXY_API_URL}/workflows/jobs?workflow_id=${mockWorkflowId}`, {
        body: mockJobs,
        headers: { 'content-type': 'application/json' }
      });

      const expectedActions = [
        { type: REQUEST_WORKFLOW_JOBS, workflowId: mockWorkflowId },
        { type: RECEIVE_WORKFLOW_JOBS_SUCCESS, jobsList: mockJobs }
      ];

      return store.dispatch(JobsActions.requestJobsList(mockWorkflowId)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });


    it('creates a REQUEST_CLUSTERS_DATA, RECEIVE_CLUSTERS_DATA_SUCCESS, ' +
      'RECEIVE_CLUSTERS_DATA_SUCCESS & REQUEST_CLUSTER_CHART_UPDATE ' +
      'when fetching job result is done', () => {
        const mockResultId = "2a56795cad3c7db3";

        const mockJobResult = "{\n  \"Total\": 20\n}\n";

        fetchMock.getOnce(`${GALAXY_API_URL}/workflows/results/${mockResultId}`, {
          body: mockJobResult,
          headers: { 'content-type': 'application/json' }
        });
        const expectedActions = [
          { type: REQUEST_JOB_RESULT, resultId: mockResultId },
          { type: REQUEST_CLUSTERS_DATA },
          { type: RECEIVE_CLUSTERS_DATA_SUCCESS, clusters: [], links: [] },
          { type: REQUEST_CLUSTER_CHART_UPDATE, chartData: [], linksData: [], selectedCluster: {}, selectedRange: 0 }
        ];

        return store.dispatch(JobsActions.requestJobResult(mockResultId)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });



      });

  });
});
