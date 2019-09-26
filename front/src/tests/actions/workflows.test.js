import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import {

  REQUEST_WORKFLOWS_LIST,
  RECEIVE_WORKFLOWS_LIST_ERROR,
  RECEIVE_WORKFLOWS_LIST_SUCCESS,

  REQUEST_WORKFLOW_INPUTS,
  RECEIVE_WORKFLOW_INPUTS_ERROR,
  RECEIVE_WORKFLOW_INPUTS_SUCCESS,

  REQUEST_WORKFLOW_OUTPUTS,
  RECEIVE_WORKFLOW_OUTPUTS_ERROR,
  RECEIVE_WORKFLOW_OUTPUTS_SUCCESS,

  REQUEST_WORKFLOW_SELECTION,

  REQUEST_WORKFLOW_EXECUTION,
  RECEIVE_WORKFLOW_EXECUTION_ERROR,
  RECEIVE_WORKFLOW_EXECUTION_SUCCESS,

  REQUEST_WORKFLOW_PARAMETERS_PRELOAD,

  REQUEST_WORKFLOW_PARAMETERS_CHANGE,

  REQUEST_WORKFLOW_FILE_PRELOAD
} from '../../constants';
import WorkflowActions from '../../actions/WorkflowsActions';

const GALAXY_API_URL = process.env.REACT_APP_GALAXY_API;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  workflows: {
    selectedWorkflowId: '21df2sdf2sd1fsd',
    selectedWorkflowParameters: {
      clusters: '20',
    }
  },
  files: {
    selectedUploadedFiles: {
      metadata: 'metadata_file_id',
      docterm: 'docterm_file_id'
    }
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

    it('creates a RECEIVE_WORKFLOWS_LIST_SUCCESS when fetching workflows list has been done', () => {
      const mockWorkflows = [
        {
          id: '21df2sdf2sd1fsd',
          name: 'my_workflow'
        },
        {
          id: '21df2sdf2sd1fsd',
          name: 'my_workflow'
        }
      ]
      fetchMock.getOnce(`${GALAXY_API_URL}/workflows/`, {
        body: mockWorkflows,
        headers: { 'content-type': 'application/json' }
      });
      const expectedActions = [
        { type: REQUEST_WORKFLOWS_LIST },
        { type: RECEIVE_WORKFLOWS_LIST_SUCCESS, workflows: mockWorkflows }
      ];

      return store.dispatch(WorkflowActions.requestWorkflowsList()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates a REQUEST_WORKFLOW_SELECTION & a REQUEST_WORKFLOW_INPUTS when selecting a workflow with an id not null', () => {
      const mockWorkflowId = '21df2sdf2sd1fsd';
      const expectedActions = [
        { type: REQUEST_WORKFLOW_SELECTION, id: mockWorkflowId },
        { type: REQUEST_WORKFLOW_INPUTS }
      ];

      store.dispatch(WorkflowActions.selectWorkflow(mockWorkflowId));
      expect(store.getActions()).toEqual(expectedActions);

    });

    it('creates a REQUEST_WORKFLOW_SELECTION when selecting a workflow with an id', () => {
      const mockWorkflowId = null;
      const expectedActions = [
        { type: REQUEST_WORKFLOW_SELECTION, id: mockWorkflowId }
      ];

      store.dispatch(WorkflowActions.selectWorkflow(mockWorkflowId));
      expect(store.getActions()).toEqual(expectedActions);

    });

    it('creates a RECEIVE_WORKFLOW_INPUTS_SUCCESS,' +
      ' REQUEST_WORKFLOW_FILE_PRELOAD & REQUEST_WORKFLOW_PARAMETERS_PRELOAD' +
      ' when fetching workflow inputs has been done', () => {
        const mockWorkflowId = '21df2sdf2sd1fsd';
        const mockWorkflowInputs = [
          {
            name: 'clusters',
            type: 'integer',
            value: '20'
          },
          {
            name: 'metadata',
            type: 'file',
            value: ''
          }
        ];
        const mockWorkflowOnlyFiles = {
          metadata: null
        };
        const mockWorkflowWithoutFiles =
        {
          clusters: '20'
        };

        fetchMock.getOnce(`${GALAXY_API_URL}/workflows/${mockWorkflowId}/inputs`, {
          body: mockWorkflowInputs,
          headers: { 'content-type': 'application/json' }
        });
        const expectedActions = [
          { type: REQUEST_WORKFLOW_INPUTS },
          { type: RECEIVE_WORKFLOW_INPUTS_SUCCESS, workflowInputs: mockWorkflowInputs },
          { type: REQUEST_WORKFLOW_FILE_PRELOAD, preloadFiles: mockWorkflowOnlyFiles },
          { type: REQUEST_WORKFLOW_PARAMETERS_PRELOAD, preloadParameters: mockWorkflowWithoutFiles }
        ];

        return store.dispatch(WorkflowActions.requestWorkflowInputs(mockWorkflowId)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });

      });

    it('creates a REQUEST_WORKFLOW_PARAMETERS_PRELOAD with formated parameters', () => {
      const mockWorkflowInputs = [
        {
          name: 'clusters',
          type: 'integer',
          value: '20'
        },
        {
          name: 'metadata',
          type: 'file',
          value: ''
        }
      ];
      const mockWorkflowWithoutFiles =
      {
        clusters: '20'
      };

      const expectedActions = [
        { type: REQUEST_WORKFLOW_PARAMETERS_PRELOAD, preloadParameters: mockWorkflowWithoutFiles }
      ];

      store.dispatch(WorkflowActions.requestWorkflowParametersPreload(mockWorkflowInputs));
      expect(store.getActions()).toEqual(expectedActions);

    });

    it('creates a REQUEST_WORKFLOW_PARAMETERS_CHANGE', () => {
      const mockParamName = 'clusters';
      const mockParamValue = '20';

      const expectedActions = [
        { type: REQUEST_WORKFLOW_PARAMETERS_CHANGE, paramName: mockParamName, paramValue: mockParamValue }
      ];

      store.dispatch(WorkflowActions.requestWorkflowParameterChange(mockParamName, mockParamValue));
      expect(store.getActions()).toEqual(expectedActions);

    });

    it('creates a RECEIVE_WORKFLOW_OUTPUTS_SUCCESS when fetching workflow outputs has been done', () => {
      const mockWorkflowId = '21df2sdf2sd1fsd';
      const mockWorkflowOutputs = [{
        label: 'kmeans_clusters',
        output_name: 'output'
      }];

      fetchMock.getOnce(`${GALAXY_API_URL}/workflows/${mockWorkflowId}/outputs`, {
        body: mockWorkflowOutputs,
        headers: { 'content-type': 'application/json' }
      });
      const expectedActions = [
        { type: REQUEST_WORKFLOW_OUTPUTS },
        { type: RECEIVE_WORKFLOW_OUTPUTS_SUCCESS, workflowOutputs: mockWorkflowOutputs }
      ];

      return store.dispatch(WorkflowActions.requestWorkflowOutputs(mockWorkflowId)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });

    });



    it('creates a RECEIVE_WORKFLOW_EXECUTION_SUCCESS when workflow has been succesfully invoked', () => {
      const mockWorkflowInvocationData = [{ id : '654d5fsd5fs5dfdf' }];

      fetchMock.postOnce(`${GALAXY_API_URL}/workflows/execute`,
        {
          body: mockWorkflowInvocationData,
          headers: { 'content-type': 'application/json' }
        }
      );
      const expectedActions = [
        { type: REQUEST_WORKFLOW_EXECUTION },
        { type: RECEIVE_WORKFLOW_EXECUTION_SUCCESS, workflowInvocationData: mockWorkflowInvocationData, message: 'Workflow successfuly invoked' }
      ];

      return store.dispatch(WorkflowActions.requestWorkflowExecution()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });

    });

  });
});
