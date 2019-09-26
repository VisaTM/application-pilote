import {
  REQUEST_WORKFLOW_JOBS,
  RECEIVE_WORKFLOW_JOBS_SUCCESS,
  RECEIVE_JOB_RESULT_SUCCESS,
} from '../../constants';
import reducer from '../../reducers/jobs';

const initialState = {
  jobsList: [],
  jobResult: {},
  loadingJobs: true,
}

describe('reducers', () => {
  describe('jobs', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    });

    it('should handle REQUEST_WORKFLOW_JOBS', () => {

      expect(reducer(initialState, {
        type: REQUEST_WORKFLOW_JOBS
      })).toEqual({
        ...initialState,
        loadingJobs: true
      });
    });

    it('should handle RECEIVE_WORKFLOW_JOBS_SUCCESS', () => {
      const expectedJobsList = [
        {
          id: "f2db41e1fa331b3e",
          state: "ok",
          workflow_id: "f2db41e1fa331b3e"
        },
        {
          id: "2a56795cad3c7db3",
          state: "running",
          workflow_id: "f2db41e1fa331b3e"
        },
      ];

      expect(reducer(initialState,
        {
          type: RECEIVE_WORKFLOW_JOBS_SUCCESS, jobsList: expectedJobsList
        }
      )).toEqual({
        ...initialState,
        loadingJobs: false,
        jobsList: expectedJobsList
      });
    });

    it('should handle RECEIVE_JOB_RESULT_SUCCESS', () => {
      const expectedJobResult = {
        id: "f2db41e1fa331b3e",
        state: "ok",
        workflow_id: "f2db41e1fa331b3e"
      };

      expect(reducer(initialState,
        {
          type: RECEIVE_JOB_RESULT_SUCCESS, jobResult: expectedJobResult
        }
      )).toEqual({
        ...initialState,
        jobResult: expectedJobResult
      });
    });

  });

});

