
import {
  RECEIVE_QUERY_DATA_SUCCESS,
  RECEIVE_QUERY_UPDATE, RECEIVE_QUERY_UPDATE_SUCCESS,
} from '../constants';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const initialState = {
  query: '',
  nb_doc: 0,
};

const istex = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_QUERY_DATA_SUCCESS:
      return {
        ...state,
        nb_doc: action.nb_doc,
      };
    case RECEIVE_QUERY_UPDATE:

      return {
        ...state,
        query: action.query,
        nb_doc: action.nb_doc,
      };
    case RECEIVE_QUERY_UPDATE_SUCCESS:
      return {
        ...state,
        query: action.query,
        nb_doc: action.nb_doc,
      };
    default:
      return state;
  }
};

export default istex;
