import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import {
  RECEIVE_DOCUMENTS_DATA_SUCCESS,
  REQUEST_DOCUMENTS_FILTERING,
  REQUEST_DOCUMENT_METADATA,
  RECEIVE_DOCUMENT_METADATA_SUCCESS,
  REQUEST_SHOW_DOCUMENT_MODAL,
  REQUEST_HIDE_DOCUMENT_MODAL
} from '../../constants';
import DocumentsActions from '../../actions/DocumentsActions';

const ISTEX_API_URL = process.env.REACT_APP_ISTEX_API;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  charts: {
    chartType: "terms"
  },
  terms: {
    selected: {
      name: "oceanography",
      List: ["000000", "000001", "000012"]
    }
  }
});



describe('actions', () => {
  describe('workflows', () => {
    beforeEach(() => {
      store.clearActions()
    });
    afterEach(() => {
      fetchMock.restore()
    });


    it('creates a RECEIVE_DOCUMENTS_DATA_SUCCESS when receiving documents data', () => {
      const mockDocumentsList = [
        {
          Filename: "GS2_0447726",
          Reference: "000100"
        },
        {
          Filename: "GS2_0820440",
          Reference: "000192"
        }
      ];
      const expectedActions = [
        { type: RECEIVE_DOCUMENTS_DATA_SUCCESS, documents: mockDocumentsList }
      ];

      store.dispatch(DocumentsActions.receiveDocumentsData(mockDocumentsList));
      expect(store.getActions()).toEqual(expectedActions);

    });

    it('creates a REQUEST_DOCUMENTS_FILTERING with a reference list', () => {
      const expectedReferenceList = ["000000", "000001", "000012"];
      const expectedActions = [
        { type: REQUEST_DOCUMENTS_FILTERING, referencesList: expectedReferenceList }
      ];

      store.dispatch(DocumentsActions.filterDocumentsList());
      expect(store.getActions()).toEqual(expectedActions);

    });

    it('creates a REQUEST_SHOW_DOCUMENT_MODAL when requesting modal opening', () => {
      const expectedActions = [
        { type: REQUEST_SHOW_DOCUMENT_MODAL}
      ];

      store.dispatch(DocumentsActions.showDocumentModal());
      expect(store.getActions()).toEqual(expectedActions);

    });

    it('creates a REQUEST_HIDE_DOCUMENT_MODAL when requesting modal closing', () => {
      const expectedActions = [
        { type: REQUEST_HIDE_DOCUMENT_MODAL}
      ];

      store.dispatch(DocumentsActions.hideDocumentModal());
      expect(store.getActions()).toEqual(expectedActions);

    });

    it('creates a RECEIVE_DOCUMENT_METADATA_SUCCESS when fetching the document metadata is done', () => {
      const mockSelectedDocument = {
        ARK: "ark:/67375/WNG-1VG76960-7",
        Filename: "GS2_0792287"
      }
      const expectedDocumentMetadata = {
        corpusName: "wiley",
        abstract: "long abstract",
        title: "unoriginal title"
      }

      const expectedActions = [
        { type: REQUEST_DOCUMENT_METADATA },
        { type: RECEIVE_DOCUMENT_METADATA_SUCCESS, documentMetadata: expectedDocumentMetadata, }
      ];

      fetchMock.getOnce(`${ISTEX_API_URL}/${mockSelectedDocument.ARK}/record.json`, {
        body: expectedDocumentMetadata,
        headers: { 'content-type': 'application/json' }
      }
      );
      return store.dispatch(DocumentsActions.fetchDocumentMetadata(mockSelectedDocument)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });

    });


  });
});
