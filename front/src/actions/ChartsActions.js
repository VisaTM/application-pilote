import {
  REQUEST_CLUSTER_CHART_UPDATE,
  REQUEST_BAR_CHART_UPDATE
} from '../constants';


let ChartsActions = {

  updateClusterChart() {
    return (dispatch, getState) => {
      const clusters = getState().clusters.list;
      const links = getState().clusters.links;
      const selectedCluster = getState().clusters.selected;
      const selectedRange = getState().clusters.selectedRange;
      dispatch({ type: REQUEST_CLUSTER_CHART_UPDATE, chartData: clusters, linksData: links, selectedCluster, selectedRange });
    }
  },

  chooseBarChart(chart) {
    switch (chart) {
      case 'terms':
        return (dispatch) => {
          dispatch(this.updateTermsChart())
        }
      case 'sources':
        return (dispatch) => {
          dispatch(this.updateSourcesChart())
        }
      default:
        return (dispatch) => {
          dispatch(this.updateTermsChart())
        }
    }

  },

  updateTermsChart(termId) {
    return (dispatch, getState) => {
      const terms = getState().terms.list;
      const selectedCluster = getState().clusters.selected;
      dispatch({ type: REQUEST_BAR_CHART_UPDATE, chartType: 'terms', chartData: terms, selectedCluster, selectedId: termId, title: "Terms" });
    }
  },

  updateSourcesChart(sourceId) {
    return (dispatch, getState) => {
      const sources = getState().sources.list;
      const selectedCluster = getState().clusters.selected;
      dispatch({ type: REQUEST_BAR_CHART_UPDATE, chartType: 'sources', chartData: sources, selectedCluster, selectedId: sourceId, title: "Sources" });
    }
  }



};

export default ChartsActions;
