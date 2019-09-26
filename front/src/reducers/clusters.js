
import {
    RECEIVE_CLUSTERS_DATA_SUCCESS,
    RECEIVE_SELECTED_CLUSTER_UPDATE_SUCCESS,
    REQUEST_STRENGTH_RANGE_UPDATE,
} from '../constants';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const initialState = {
    list: [],
    links: [],
    selected: {},
    selectedRange: 0
}

const clusters = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_CLUSTERS_DATA_SUCCESS:
            return {
                ...state,
                list: action.clusters ? action.clusters : [],
                links: action.links ? action.links : []
            };
        case RECEIVE_SELECTED_CLUSTER_UPDATE_SUCCESS:
            return {
                ...state,
                selected: action.selectedCluster ? action.selectedCluster : {}
            };

        case REQUEST_STRENGTH_RANGE_UPDATE:
        return {
            ...state,
            selectedRange: action.selectedRange ? action.selectedRange : 0
        };

        default:
            return state;
    }
}

export default clusters;
