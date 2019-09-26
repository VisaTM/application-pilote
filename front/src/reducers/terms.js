
import {
    RECEIVE_TERMS_DATA_SUCCESS,
    RECEIVE_SELECT_TERM_SUCCESS
} from '../constants';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const initialState = {
    list: [],
    selected: {},
    chartOptions: {}
}

const terms = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_TERMS_DATA_SUCCESS:
            return {
                ...state,
                list: action.terms
            };
        case RECEIVE_SELECT_TERM_SUCCESS:
            return {
                ...state,
                selected: state.list[action.termId]
            };
        default:
            return state;
    }
}

export default terms;
