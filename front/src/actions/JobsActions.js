import {
  REQUEST_WORKFLOW_JOBS,
  RECEIVE_WORKFLOW_JOBS_ERROR,
  RECEIVE_WORKFLOW_JOBS_SUCCESS,

  REQUEST_JOB_RESULT,
  RECEIVE_JOB_RESULT_ERROR,
} from '../constants';
import API from '../api';
import ClustersActions from './ClustersActions';



let JobsActions = {


  requestJobsList(workflowId) {
    return (dispatch) => {
      dispatch({ type: REQUEST_WORKFLOW_JOBS, workflowId });
      let workflowCallback;
      if (workflowId === null) {
        workflowCallback = API.requestAllJobsList();
      } else {
        workflowCallback = API.requestJobsList(workflowId)
      }

      return workflowCallback.then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
      })
        .then((data) => {

          dispatch({ type: RECEIVE_WORKFLOW_JOBS_SUCCESS, jobsList: data });
        })
        .catch((error) => {
          dispatch({ type: RECEIVE_WORKFLOW_JOBS_ERROR, error: error.message })
        });
    };

  },

  requestJobResult(resultId) {
    return (dispatch) => {
      dispatch({ type: REQUEST_JOB_RESULT, resultId });
      return API.requestJobResult(resultId)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          }
        })
        .then((data) => {
          dispatch(ClustersActions.receiveClusterData(JSON.parse(data)))
        })
        .catch((error) => {
          dispatch({ type: RECEIVE_JOB_RESULT_ERROR, error: error.message })
        });
    };

  }




};

export default JobsActions;
