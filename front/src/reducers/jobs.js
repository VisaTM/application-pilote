import {
  REQUEST_WORKFLOW_JOBS,
  RECEIVE_WORKFLOW_JOBS_SUCCESS,
  RECEIVE_JOB_RESULT_SUCCESS,
} from '../constants';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const initialState = {
  jobsList: [],
  jobResult: {},
  loadingJobs: true,
}

const jobs = (state = initialState, action) => {
  switch (action.type) {
    // Workflow jobs
    case REQUEST_WORKFLOW_JOBS:
      return {
        ...state,
        loadingJobs: true // When jobs are requested, set the loading bool to true. Used in the jobs table
      }
    case RECEIVE_WORKFLOW_JOBS_SUCCESS:
      return {
        ...state,
        jobsList: action.jobsList,
        loadingJobs: false // When jobs are received, set the loading bool to false. Used in the jobs table
      }
    // Job Result
    case RECEIVE_JOB_RESULT_SUCCESS:
      return {
        ...state,
        jobResult: action.jobResult
      }


    default:
      return state;
  }
}


export default jobs;

