import {
    RECEIVE_SOURCES_DATA_SUCCESS,
    RECEIVE_SELECT_SOURCE_SUCCESS
} from '../constants';

import DocumentsActions from './DocumentsActions';
import ChartsActions from './ChartsActions';


let SourcesActions = {


    receiveSourcesData(sourcesData) {
        return (dispatch) => {

            dispatch({ type: RECEIVE_SOURCES_DATA_SUCCESS, sources: sourcesData });
            //dispatch(ChartsActions.updateSourcesChart());

        };
    },

    selectSource(sourceId) {
        return (dispatch, getState) => {
            const selectedCluster = getState().clusters.selected;
            dispatch({ type: RECEIVE_SELECT_SOURCE_SUCCESS, sourceId, selectedCluster })
            dispatch(ChartsActions.updateSourcesChart(sourceId));
            dispatch(DocumentsActions.filterDocumentsList());
        }
    }

};

export default SourcesActions;
