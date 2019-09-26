import {
  RECEIVE_CLUSTERS_DATA_ERROR,
  RECEIVE_STRENGTH_RANGE_UPDATE_ERROR,
  RECEIVE_DOCUMENT_METADATA_ERROR,
  RECEIVE_FILES_UPLOAD_ERROR,
  RECEIVE_WORKFLOWS_LIST_ERROR,
  RECEIVE_WORKFLOW_INPUTS_ERROR,
  RECEIVE_WORKFLOW_OUTPUTS_ERROR,
  RECEIVE_UPLOADED_FILES_LIST_ERROR,
  RECEIVE_WORKFLOW_EXECUTION_ERROR,
  RECEIVE_WORKFLOW_JOBS_ERROR,
  RECEIVE_JOB_RESULT_ERROR,

  RECEIVE_WORKFLOW_EXECUTION_SUCCESS,
  RECEIVE_FILES_UPLOAD_SUCCESS,

  REQUEST_NOTIFICATION_DISMISS,

} from '../constants';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const initialState = {
  message: null,
  type: null,
}

const notifications = (state = initialState, action) => {
  switch (action.type) {
    /*
     * Error messages
     */
    case RECEIVE_CLUSTERS_DATA_ERROR:
    case RECEIVE_STRENGTH_RANGE_UPDATE_ERROR:
    case RECEIVE_DOCUMENT_METADATA_ERROR:
    case RECEIVE_FILES_UPLOAD_ERROR:
    case RECEIVE_WORKFLOWS_LIST_ERROR:
    case RECEIVE_WORKFLOW_INPUTS_ERROR:
    case RECEIVE_WORKFLOW_OUTPUTS_ERROR:
    case RECEIVE_UPLOADED_FILES_LIST_ERROR:
    case RECEIVE_WORKFLOW_EXECUTION_ERROR:
    case RECEIVE_WORKFLOW_JOBS_ERROR:
    case RECEIVE_JOB_RESULT_ERROR:
    return {
      ...state,
      message: action.error,
      type: 'danger'
    }
    /*
     * Success messages
     */
    case RECEIVE_WORKFLOW_EXECUTION_SUCCESS:
    case RECEIVE_FILES_UPLOAD_SUCCESS:
    return {
      ...state,
      message: action.message,
      type: 'success'
    }
    /*
     * Notification dismiss
     */
    case REQUEST_NOTIFICATION_DISMISS:
    return {
      ...state,
      message: null,
      type: null
    }

    default:
      return state;
  }
}

export default notifications;
