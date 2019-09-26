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
} from '../constants';
import API from '../api';

import FilesActions from './FilesActions';


let WorkflowsActions = {


  requestWorkflowsList(workflowType) {
    return (dispatch) => {
      dispatch({ type: REQUEST_WORKFLOWS_LIST });
      return API.requestWorkflowsList(workflowType)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          }
        })
        .then((data) => {
          dispatch({ type: RECEIVE_WORKFLOWS_LIST_SUCCESS, workflows: data });
        })
        .catch((error) => {
          dispatch({ type: RECEIVE_WORKFLOWS_LIST_ERROR, error: error.message })
        });


    };

  },

  selectWorkflow(id) {
    return (dispatch) => {
      dispatch({ type: REQUEST_WORKFLOW_SELECTION, id });
      if(id) {
        dispatch(this.requestWorkflowInputs(id));
      }
    };

  },

  requestWorkflowInputs(id) {
    return (dispatch) => {
      dispatch({ type: REQUEST_WORKFLOW_INPUTS });
      return API.requestWorkflowInputs(id)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          }
        })
        .then((data) => {

          dispatch({ type: RECEIVE_WORKFLOW_INPUTS_SUCCESS, workflowInputs: data });
          dispatch(FilesActions.requestWorkflowFilePreload(data));
          dispatch(this.requestWorkflowParametersPreload(data));
        })
        .catch((error) => {
          dispatch({ type: RECEIVE_WORKFLOW_INPUTS_ERROR, error: error.message })
        });


    };

  },

  requestWorkflowParametersPreload(workflowInputs) {
    return (dispatch) => {
      if(workflowInputs) {
        const preloadParameters = {}
        // For each input in the workflow description, create a new property in the preloadFiles object
        workflowInputs.filter(input => input["type"] !== "file" )
        .forEach((p) => {
          preloadParameters[p.name] = p.value ? { value: p.value, tool_id: p.tool_id } : { value: null, tool_id: p.tool_id }
        });
        dispatch({ type: REQUEST_WORKFLOW_PARAMETERS_PRELOAD, preloadParameters });
      }

    };
  },

  requestWorkflowParameterChange(paramName, paramValue) {
    return (dispatch) => {
      dispatch({ type: REQUEST_WORKFLOW_PARAMETERS_CHANGE, paramName, paramValue})
    }
  },

  requestWorkflowOutputs(id) {
    return (dispatch) => {
      dispatch({ type: REQUEST_WORKFLOW_OUTPUTS });
      return API.requestWorkflowOutputs(id)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          }
        })
        .then((data) => {
          dispatch({ type: RECEIVE_WORKFLOW_OUTPUTS_SUCCESS, workflowOutputs: data });
        })
        .catch((error) => {
          dispatch({ type: RECEIVE_WORKFLOW_OUTPUTS_ERROR, error: error.message })
        });


    };

  },

  requestWorkflowExecution() {
    return (dispatch, getState) => {
      const workflowId = getState().workflows.selectedWorkflowId;
      const files = getState().files.selectedUploadedFiles;
      const params = getState().workflows.selectedWorkflowParameters;


      let formattedParams = {}
      for (let key in params) {
        const tool_id = params[key].tool_id;
        formattedParams[tool_id] = formattedParams[tool_id] ?
                                  { ...formattedParams[tool_id], [key]: params[key].value } :
                                  { [key]: params[key].value }

      }

      dispatch({ type: REQUEST_WORKFLOW_EXECUTION });
      return API.requestWorkflowExecution(workflowId, files, formattedParams)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          }
        })
        .then((data) => {
          dispatch({ type: RECEIVE_WORKFLOW_EXECUTION_SUCCESS, workflowInvocationData: data, message: 'Workflow successfuly invoked' });
        })
        .catch((error) => {
          dispatch({ type: RECEIVE_WORKFLOW_EXECUTION_ERROR, error: error.message })
        });
    };

  },




};

export default WorkflowsActions;
