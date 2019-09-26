import {
  REQUEST_CLUSTERS_DATA,
  RECEIVE_CLUSTERS_DATA_SUCCESS,
  RECEIVE_CLUSTERS_DATA_ERROR,

  RECEIVE_SELECTED_CLUSTER_UPDATE_SUCCESS,

  REQUEST_STRENGTH_RANGE_UPDATE,
  RECEIVE_STRENGTH_RANGE_UPDATE_ERROR
} from '../constants';

import frequencyFormater from '../utils/frequencyFormater';
import listFormater from '../utils/listFormater';
import coordinatesFormater from '../utils/coordinatesFormater';
import linksFormater from '../utils/linksFormater';
import API from '../api';

import TermsActions from './TermsActions';
import SourcesActions from './SourcesActions';
import DocumentsActions from './DocumentsActions';
import ChartsActions from './ChartsActions';


let ClustersActions = {

  receiveClusterData(data) {
    return (dispatch) => {
      dispatch({ type: REQUEST_CLUSTERS_DATA });
      const clusters = data && data["Clusters"] ? data["Clusters"] : [];
      const links = data && data["Links"] ? linksFormater(data["Links"]) : [];
      clusters.forEach(cluster => {
        cluster["Coordinates"] = coordinatesFormater(cluster["Coordinates"])
      });

      dispatch({ type: RECEIVE_CLUSTERS_DATA_SUCCESS, clusters, links });
      dispatch(ChartsActions.updateClusterChart());

    }
  },


  fetchClusterMetadata() {
    return (dispatch) => {
      dispatch({ type: REQUEST_CLUSTERS_DATA });
      API.fetchClusterMetadata()
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          }
        })
        .then((data) => {
          const clusters = data && data["Clusters"] ? data["Clusters"] : [];
          const links = data && data["Links"] ? linksFormater(data["Links"]) : [];

          clusters.forEach(cluster => {
            cluster["Coordinates"] = coordinatesFormater(cluster["Coordinates"])
          });
          dispatch({ type: RECEIVE_CLUSTERS_DATA_SUCCESS, clusters, links });
          dispatch(ChartsActions.updateClusterChart());
        })
        .catch((error) => {
          dispatch({ type: RECEIVE_CLUSTERS_DATA_ERROR, error: error.message })
        });
    };
  },

  selectCluster(cluster) {
    return (dispatch) => {
      dispatch({ type: RECEIVE_SELECTED_CLUSTER_UPDATE_SUCCESS, selectedCluster: cluster });
      dispatch(ChartsActions.updateClusterChart());
      // Terms
      const terms = cluster["Terms"] ? cluster["Terms"].reverse() : [];

      terms.forEach(term => {
        term["Frequency"] = frequencyFormater(term["Frequency"])
        term["List"] = listFormater(term["List"]);
        term.label = term["Term"];
      });

      dispatch(TermsActions.receiveTermsData(terms));

      // Documents
      const documents = cluster["Documents"];
      dispatch(DocumentsActions.receiveDocumentsData(documents));

      // Sources
      const sources = cluster["Sources"] ? cluster["Sources"].reverse() : [];
      sources.forEach(source => {
        source["Frequency"] = frequencyFormater(source["Frequency"])
        source["List"] = listFormater(source["List"]);
        source.label = source["Title"];
      });

      dispatch(SourcesActions.receiveSourcesData(sources));
    };


  },

  // Commented this for legacy concerns
  /*selectCluster(cluster) {
    const clusterId = cluster["Id"]
    return (dispatch) => {
      dispatch({ type: RECEIVE_SELECTED_CLUSTER_UPDATE_SUCCESS, selectedCluster: cluster });
      dispatch(ChartsActions.updateClusterChart());
      API.fetchClusterDataById(clusterId)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          }
        })
        .then((data) => {
          // Terms
          const terms = data["Terms"].reverse();
          terms.forEach(term => {
            term["Frequency"] = frequencyFormater(term["Frequency"])
            term["List"] = listFormater(term["List"]);
            term.label = term["Term"];
          });

          dispatch(TermsActions.receiveTermsData(terms));

          // Documents
          const documents = data["Documents"];
          dispatch(DocumentsActions.receiveDocumentsData(documents));

          // Sources
          const sources = data["Sources"].reverse();
          sources.forEach(source => {
            source["Frequency"] = frequencyFormater(source["Frequency"])
            source["List"] = listFormater(source["List"]);
            source.label = source["Title"];
          });

          dispatch(SourcesActions.receiveSourcesData(sources));
        })
        .catch((error) => {
          dispatch({ type: RECEIVE_CLUSTERS_DATA_ERROR, error: error.message })
        });
    };


  },*/

  selectRange(range) {
    return (dispatch) => {
      const parsedRange = parseFloat(range)
      if (isNaN(parsedRange)) {
        dispatch({ type: RECEIVE_STRENGTH_RANGE_UPDATE_ERROR, error: "Range is not a number" });
      } else {
        dispatch({ type: REQUEST_STRENGTH_RANGE_UPDATE, selectedRange: parsedRange });
        dispatch(ChartsActions.updateClusterChart());
      }
    };
  }



};

export default ClustersActions;
