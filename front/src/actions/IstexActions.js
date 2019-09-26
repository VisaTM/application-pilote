import {
  RECEIVE_QUERY_UPDATE, RECEIVE_QUERY_UPDATE_SUCCESS, RECEIVE_QUERY_UPDATE_ERROR,
  RECEIVE_QUERY_DATA, RECEIVE_QUERY_DATA_ERROR, RECEIVE_QUERY_DATA_SUCCESS
} from '../constants';
import API from '../api';



let IstexActions = {

  requestIstexNb(query) {
    return (dispatch) => {
      dispatch({ type: RECEIVE_QUERY_UPDATE, query});
      API.requestIstexNb(query)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          }
        })
        .then((data) => {
          dispatch({ type: RECEIVE_QUERY_UPDATE_SUCCESS,query:query, nb_doc: data });
        })
        .catch((error) => {
          dispatch({ type: RECEIVE_QUERY_UPDATE_ERROR, error: error.message })
        });
    };

  },

  downloadFilesIstex(query) {
    return (dispatch) => {
      dispatch({ type: RECEIVE_QUERY_DATA, query});
      API.downloadFilesIstex(query)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          }
        })
        .then((data) => {
          dispatch({ type: RECEIVE_QUERY_DATA_SUCCESS,query:query});
        })
        .catch((error) => {
          dispatch({ type: RECEIVE_QUERY_DATA_ERROR, error: error.message })
        });
    };

  }

};

export default IstexActions;
