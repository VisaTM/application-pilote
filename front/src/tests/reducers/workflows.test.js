import {
  REQUEST_WORKFLOW_SELECTION,
  RECEIVE_WORKFLOW_EXECUTION_SUCCESS,
  RECEIVE_WORKFLOWS_LIST_SUCCESS,
  RECEIVE_WORKFLOW_INPUTS_SUCCESS,
  RECEIVE_WORKFLOW_OUTPUTS_SUCCESS,
  REQUEST_WORKFLOW_PARAMETERS_PRELOAD,
  REQUEST_WORKFLOW_PARAMETERS_CHANGE,
} from '../../constants';
import reducer from '../../reducers/workflows';


const initialState = {
  workflowsList: [],
  selectedWorkflowId: null,
  selectedWorkflowParameters: {},
  workflowInvocationData: null,
  selectedWorkflowInputs: [],
  selectedworkflowOutputs: [],
  areParametersValid: false
}

describe('reducers', () => {
  describe('workflows', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    });

    it('should handle REQUEST_WORKFLOW_SELECTION', () => {
      expect(reducer(initialState, {
        type: REQUEST_WORKFLOW_SELECTION,
        id: 'my_selected_workflow'
      })).toEqual(
        {
          ...initialState,
          selectedWorkflowId: 'my_selected_workflow'
        }
      );

      expect(reducer(initialState, {
        type: REQUEST_WORKFLOW_SELECTION,
        id: ""
      })).toEqual(
        {
          ...initialState,
          selectedWorkflowId: null
        }
      );
    });

    it('should handle RECEIVE_WORKFLOWS_LIST_SUCCESS', () => {
      const workflowList = [
        {
          id: 'f2db41e1fa331b3e',
          name: 'workflow1'
        },
        {
          id: 'f2db41e1fa331b3e',
          name: 'workflow2'
        }
      ]

      expect(reducer(initialState, {
        type: RECEIVE_WORKFLOWS_LIST_SUCCESS,
        workflows: workflowList
      })).toEqual(
        {
          ...initialState,
          workflowsList: workflowList
        }
      );
    });

    it('should handle RECEIVE_WORKFLOW_INPUTS_SUCCESS', () => {
      const workflowInputsList = [
        {
          label: 'Fichier source “document × terme',
          type: 'file'
        },
        {
          id: 'clusters',
          name: 'integer'
        }
      ]

      expect(reducer(initialState, {
        type: RECEIVE_WORKFLOW_INPUTS_SUCCESS,
        workflowInputs: workflowInputsList
      })).toEqual(
        {
          ...initialState,
          selectedWorkflowInputs: workflowInputsList
        }
      );
    });

    it('should handle RECEIVE_WORKFLOW_OUTPUTS_SUCCESS', () => {
      const workflowOutputsList = [
        {
          label: 'kmeans_clusters',
          output_name: 'output'
        },
        {
          id: 'lda_clusters',
          output_name: 'output'
        }
      ]

      expect(reducer(initialState, {
        type: RECEIVE_WORKFLOW_OUTPUTS_SUCCESS,
        workflowOutputs: workflowOutputsList
      })).toEqual(
        {
          ...initialState,
          selectedworkflowOutputs: workflowOutputsList
        }
      );
    });

    it('should handle RECEIVE_WORKFLOW_EXECUTION_SUCCESS', () => {
      expect(reducer(initialState, {
        type: RECEIVE_WORKFLOW_EXECUTION_SUCCESS,
        workflowInvocationData: 'my_invoqued_workflow_data'
      })).toEqual(
        {
          ...initialState,
          workflowInvocationData: 'my_invoqued_workflow_data'
        }
      );
    });

    it('should handle REQUEST_WORKFLOW_PARAMETERS_PRELOAD', () => {
      const preloadedInputs = [
        {
          type: "integer",
          name: 'integer_input',
          value: 'value'
        },
        {
          type: "text",
          name: 'text_input',
          value: 'value'
        },
      ]
      expect(reducer(initialState, {
        type: REQUEST_WORKFLOW_PARAMETERS_PRELOAD,
        preloadParameters: preloadedInputs
      })).toEqual(
        {
          ...initialState,
          selectedWorkflowParameters: preloadedInputs
        }
      );
    });

    it('should handle REQUEST_WORKFLOW_PARAMETERS_CHANGE with valid parameters', () => {
      const state = {
        ...initialState,
        selectedWorkflowParameters: {
          frequency: "0.2",
          clusters: null
        }
      }
      const expectedParameters = {
        frequency: "0.2",
        clusters: "20"
      }

      expect(reducer(state, {
        type: REQUEST_WORKFLOW_PARAMETERS_CHANGE,
        paramName: 'clusters',
        paramValue: "20"
      })).toEqual(
        {
          ...initialState,
          areParametersValid: true,
          selectedWorkflowParameters: expectedParameters
        }
      );
    });


    it('should handle REQUEST_WORKFLOW_PARAMETERS_CHANGE with invalid parameters', () => {
      const state = {
        ...initialState,
        selectedWorkflowParameters: {
          frequency: null,
          clusters: null
        }
      }
      const expectedParameters = {
        frequency: null,
        clusters: "20"
      }

      expect(reducer(state, {
        type: REQUEST_WORKFLOW_PARAMETERS_CHANGE,
        paramName: 'clusters',
        paramValue: "20"
      })).toEqual(
        {
          ...initialState,
          areParametersValid: false,
          selectedWorkflowParameters: expectedParameters
        }
      );
    });


  });

});
