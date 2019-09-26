import {
    RECEIVE_TERMS_DATA_SUCCESS,
    RECEIVE_SELECT_TERM_SUCCESS
} from '../constants';

import DocumentsActions from './DocumentsActions';
import ChartsActions from './ChartsActions';


let TermsActions = {


    receiveTermsData(termsData) {
        return (dispatch) => {

            dispatch({ type: RECEIVE_TERMS_DATA_SUCCESS, terms: termsData });
            dispatch(ChartsActions.updateTermsChart());

        };
    },

    selectTerm(termId) {
        return (dispatch, getState) => {
            const selectedCluster = getState().clusters.selected;
            dispatch({ type: RECEIVE_SELECT_TERM_SUCCESS, termId, selectedCluster })
            dispatch(ChartsActions.updateTermsChart(termId));
            dispatch(DocumentsActions.filterDocumentsList());
        }
    }

};

export default TermsActions;
