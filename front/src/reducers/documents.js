
import {
    RECEIVE_DOCUMENTS_DATA_SUCCESS,
    REQUEST_DOCUMENTS_FILTERING,
    RECEIVE_DOCUMENT_METADATA_SUCCESS,
    REQUEST_SHOW_DOCUMENT_MODAL,
    REQUEST_HIDE_DOCUMENT_MODAL
} from '../constants';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const initialState = {
    list: [],
    filteredList: [],
    isModalOpen: false,
    selectedMetadata: {}
}

const documents = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_DOCUMENTS_DATA_SUCCESS:
            return {
                ...state,
                filteredList: [],
                list: action.documents
            };
        case REQUEST_DOCUMENTS_FILTERING:
            const filteredDocumentsList = state.list.filter(d => action.referencesList.indexOf(d["Reference"]) >= 0)
            return {
                ...state,
                filteredList: filteredDocumentsList
            };
        case REQUEST_SHOW_DOCUMENT_MODAL:
            return {
                ...state,
                isModalOpen: true
            };
        case REQUEST_HIDE_DOCUMENT_MODAL:
            return {
                ...state,
                isModalOpen: false
            };
        case RECEIVE_DOCUMENT_METADATA_SUCCESS:
            return {
                ...state,
                selectedMetadata: action.documentMetadata
            };
        default:
            return state;
    }
}

export default documents;

export const getDocumentsList = (state) => state.filteredList.length > 0 ? state.filteredList : state.list;
