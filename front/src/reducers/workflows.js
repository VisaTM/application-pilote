import {
  REQUEST_WORKFLOW_SELECTION,
  RECEIVE_WORKFLOW_EXECUTION_SUCCESS,
  RECEIVE_WORKFLOWS_LIST_SUCCESS,
  RECEIVE_WORKFLOW_INPUTS_SUCCESS,
  RECEIVE_WORKFLOW_OUTPUTS_SUCCESS,
  REQUEST_WORKFLOW_PARAMETERS_PRELOAD,
  REQUEST_WORKFLOW_PARAMETERS_CHANGE,
} from '../constants';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const initialState = {
  workflowsList: [],
  selectedWorkflowId: null,
  selectedWorkflowParameters: {},
  workflowInvocationData: null,
  selectedWorkflowInputs: [],
  selectedworkflowOutputs: [],
  areParametersValid: false
}

const workflows = (state = initialState, action) => {
  switch (action.type) {
    // Workflow Selection
    case REQUEST_WORKFLOW_SELECTION:
      const workflowId = action.id !== "" ? action.id : null;
      return {
        ...state,
        selectedWorkflowId: workflowId
      }
    // Workflows list
    case RECEIVE_WORKFLOWS_LIST_SUCCESS:
      return {
        ...state,
        workflowsList: action.workflows
      }
    // Workflow inputs
    case RECEIVE_WORKFLOW_INPUTS_SUCCESS:
      return {
        ...state,
        selectedWorkflowInputs: action.workflowInputs
      }
    // Workflow outputs
    case RECEIVE_WORKFLOW_OUTPUTS_SUCCESS:
      return {
        ...state,
        selectedworkflowOutputs: action.workflowOutputs
      }
    // Workflow Execution success
    case RECEIVE_WORKFLOW_EXECUTION_SUCCESS:
      return {
        ...state,
        workflowInvocationData: action.workflowInvocationData
      }
    // Preloaded parameters informations
    case REQUEST_WORKFLOW_PARAMETERS_PRELOAD:
      return {
        ...state,
        selectedWorkflowParameters: action.preloadParameters
      }

    case REQUEST_WORKFLOW_PARAMETERS_CHANGE:
      let paramsList = Object.assign(state.selectedWorkflowParameters)
      paramsList[action.paramName] = { ...paramsList[action.paramName], value: action.paramValue } ;
      let areParametersValid = true;
      // Checks if all the params are not null
      for (let pName in paramsList) {
        if (paramsList[pName].value === null) {
          areParametersValid = false;
          break;
        }
      }

      return {
        ...state,
        areParametersValid,
        selectedWorkflowParameters: paramsList,
      }
    default:
      return state;
  }
}


export default workflows;

export const getWorkflowFromId = (state, workflowId) => {
  return state.workflowsList.find((workflow) => {
    return workflow["id"] === workflowId
  })
}
