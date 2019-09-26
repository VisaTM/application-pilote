import {
    RECEIVE_DOCUMENTS_DATA_SUCCESS,
    REQUEST_DOCUMENTS_FILTERING,
    REQUEST_DOCUMENT_METADATA,
    RECEIVE_DOCUMENT_METADATA_SUCCESS,
    RECEIVE_DOCUMENT_METADATA_ERROR,
    REQUEST_SHOW_DOCUMENT_MODAL,
    REQUEST_HIDE_DOCUMENT_MODAL
} from '../constants';
import API from '../api';


let DocumentsActions = {


    receiveDocumentsData(documentsData) {
        return (dispatch) => {
            dispatch({ type: RECEIVE_DOCUMENTS_DATA_SUCCESS, documents: documentsData });
        };

    },

    filterDocumentsList() {
        return (dispatch, getState) => {
            const chartType = getState().charts.chartType;
            const referencesList = getState()[chartType].selected["List"];
            dispatch({ type: REQUEST_DOCUMENTS_FILTERING, referencesList });
        };
    },

    showDocumentModal() {
        return (dispatch) => {
            dispatch({ type: REQUEST_SHOW_DOCUMENT_MODAL });
        };

    },
    hideDocumentModal() {
        return (dispatch, ) => {
            dispatch({ type: REQUEST_HIDE_DOCUMENT_MODAL });
        };

    },

    fetchDocumentMetadata(selectedDocument) {
        return (dispatch) => {
            dispatch({ type: REQUEST_DOCUMENT_METADATA });
            return API.fetchDocumentMetadata(selectedDocument.ARK)
                .then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                })
                .then((data) => {
                    dispatch({ type: RECEIVE_DOCUMENT_METADATA_SUCCESS, documentMetadata: data });
                })
                .catch((error) => {
                  dispatch({ type: RECEIVE_DOCUMENT_METADATA_ERROR, error: error.message })
                });
        }
    }


};

export default DocumentsActions;
