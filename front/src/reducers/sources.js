
import {
    RECEIVE_SOURCES_DATA_SUCCESS,
    RECEIVE_SELECT_SOURCE_SUCCESS
} from '../constants';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const initialState = {
    list: [],
    selected: {},
    chartOptions: {}
}

const sources = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_SOURCES_DATA_SUCCESS:
            return {
                ...state,
                list: action.sources
            };
        case RECEIVE_SELECT_SOURCE_SUCCESS:
            return {
                ...state,
                selected: state.list[action.sourceId]
            };
        default:
            return state;
    }
}

export default sources;
