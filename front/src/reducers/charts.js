
import {
    REQUEST_CLUSTER_CHART_UPDATE,
    REQUEST_BAR_CHART_UPDATE
} from '../constants';
import clusterChartOptions from '../utils/clusterChartOptions';
import barChartOptions from '../utils/barChartOptions';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const initialState = {
    clusterChartOptions: {},
    chartType: null,
    barChartOptions: {}
}

const charts = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_CLUSTER_CHART_UPDATE:
            return {
                ...state,
                clusterChartOptions: clusterChartOptions(action.chartData, action.linksData, action.selectedCluster, action.selectedRange)
            };
        case REQUEST_BAR_CHART_UPDATE:
            return {
                ...state,
                chartType: action.chartType,
                barChartOptions: barChartOptions(action.chartData, action.title, action.selectedCluster, action.selectedId)
            };
        default:
            return state;
    }
}

export default charts;
