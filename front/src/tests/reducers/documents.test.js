
import {
  RECEIVE_DOCUMENTS_DATA_SUCCESS,
  REQUEST_DOCUMENTS_FILTERING,
  RECEIVE_DOCUMENT_METADATA_SUCCESS,
  REQUEST_SHOW_DOCUMENT_MODAL,
  REQUEST_HIDE_DOCUMENT_MODAL
} from '../../constants';
import reducer from '../../reducers/documents';


const initialState = {
  list: [],
  filteredList: [],
  isModalOpen: false,
  selectedMetadata: {}
}

describe('reducers', () => {
  describe('documents', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    });

    it('should handle RECEIVE_DOCUMENTS_DATA_SUCCESS', () => {
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

      expect(reducer(initialState, {
        type: RECEIVE_DOCUMENTS_DATA_SUCCESS,
        documents: mockDocumentsList
      })).toEqual({
        ...initialState,
        list: mockDocumentsList,
        filteredList: []
      });
    });

    it('should handle REQUEST_DOCUMENTS_FILTERING', () => {
      const mockInitialState = {
        ...initialState,
        list: [
          {
            Filename: "GS2_0447726",
            Reference: "000100"
          },
          {
            Filename: "GS2_0820440",
            Reference: "000192"
          },
          {
            Filename: "GS2_0798513",
            Reference: "000187"
          }
        ]
      };

      const mockReferenceList = ["000100", "000187"];

      const expectedFilteredList = [
        {
          Filename: "GS2_0447726",
          Reference: "000100"
        },
        {
          Filename: "GS2_0798513",
          Reference: "000187"
        }
      ]

      expect(reducer(mockInitialState, {
        type: REQUEST_DOCUMENTS_FILTERING,
        referencesList: mockReferenceList
      })).toEqual({
        ...mockInitialState,
        filteredList: expectedFilteredList
      });
    });

    it('should handle REQUEST_SHOW_DOCUMENT_MODAL', () => {
      expect(reducer(initialState, {
        type: REQUEST_SHOW_DOCUMENT_MODAL
      })).toEqual({
        ...initialState,
        isModalOpen: true
      });
    });

    it('should handle REQUEST_HIDE_DOCUMENT_MODAL', () => {
      expect(reducer(initialState, {
        type: REQUEST_HIDE_DOCUMENT_MODAL
      })).toEqual({
        ...initialState,
        isModalOpen: false
      });
    });

    it('should handle RECEIVE_DOCUMENT_METADATA_SUCCESS', () => {
      const mockDocumentMetadata = {
        corpusName: "wiley",
        abstract: "long abstract",
        title: "unoriginal title"
      }
      expect(reducer(initialState, {
        type: RECEIVE_DOCUMENT_METADATA_SUCCESS,
        documentMetadata: mockDocumentMetadata
      })).toEqual({
        ...initialState,
        selectedMetadata: mockDocumentMetadata
      });
    });

  });

});
