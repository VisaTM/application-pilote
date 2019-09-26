import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import {
  REQUEST_FILES_UPLOAD,
  RECEIVE_FILES_UPLOAD_SUCCESS,

  REQUEST_UPLOADED_FILES_LIST,
  RECEIVE_UPLOADED_FILES_LIST_SUCCESS,

  REQUEST_UPLOADED_FILE_SELECTION,

  REQUEST_WORKFLOW_FILE_PRELOAD,
} from '../../constants';
import FilesActions from '../../actions/FilesActions';

const GALAXY_API_URL = process.env.REACT_APP_GALAXY_API;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();


describe('actions', () => {
  describe('files', () => {
    beforeEach(() => {
      store.clearActions()
    });
    afterEach(() => {
      fetchMock.restore()
    });

    it('creates a RECEIVE_FILES_UPLOAD_SUCCESS when requesting a file upload', () => {
      const mockFilesData = [
        {
          name: "ndocDocsMots.txt"
        }
      ]
      const expectecFileId = "33b43b4e7093c91f";
      const expectedUploadedFile = {
        id: "33b43b4e7093c91f",
        name: "ndocDocsMots.txt",
        url: "/api/libraries/f2db41e1fa331b3e/contents/33b43b4e7093c91f"
      }


      fetchMock.postOnce(`${GALAXY_API_URL}/files/upload`,
        {
          body: expectedUploadedFile,
          headers: { 'content-type': 'application/json' }
        }
      );
      const expectedActions = [
        { type: REQUEST_FILES_UPLOAD },
        { type: RECEIVE_FILES_UPLOAD_SUCCESS, uploadedFile: expectedUploadedFile, fileId: expectecFileId, message: 'File successfuly uploaded' }
      ];


      return store.dispatch(FilesActions.requestFilesUpload(mockFilesData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });

    });

    it('creates a RECEIVE_UPLOADED_FILES_LIST_SUCCESS when fetching files list has been done', () => {
      const expectedUploadedFiles = [
        {
          id: "33b43b4e7093c91f",
          name: "/ndocDocsMots.txt"
        },
        {
          id: "1cd8e2f6b131e891",
          name: "/ndocMetaData.txt"
        }
      ];
      fetchMock.getOnce(`${GALAXY_API_URL}/files/`, {
        body: expectedUploadedFiles,
        headers: { 'content-type': 'application/json' }
      }
      );
      const expectedActions = [
        { type: REQUEST_UPLOADED_FILES_LIST },
        { type: RECEIVE_UPLOADED_FILES_LIST_SUCCESS, uploadedFiles: expectedUploadedFiles, }
      ];


      return store.dispatch(FilesActions.requestUploadedFilesList()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });

    });

    it('creates a REQUEST_UPLOADED_FILE_SELECTION when selecting a file', () => {
      const mockFileId = "1cd8e2f6b131e891";
      const mockFileName = "/ndocMetaData.txt";

      const expectedActions = [
        { type: REQUEST_UPLOADED_FILE_SELECTION, fileName: mockFileName, fileId: mockFileId }
      ];

      store.dispatch(FilesActions.selectUploadedFile(mockFileName, mockFileId));
      expect(store.getActions()).toEqual(expectedActions);

    });

    it('creates a REQUEST_WORKFLOW_FILE_PRELOAD when selecting a workflow', () => {
      const mockWorkflowInputs = [
        {
          name: 'clusters',
          type: 'integer',
          value: '20'
        },
        {
          name: 'metadata',
          type: 'file',
          value: ''
        }
      ];
      const expectedPreloadFiles = {
        metadata: null
      };

      const expectedActions = [
        { type: REQUEST_WORKFLOW_FILE_PRELOAD, preloadFiles: expectedPreloadFiles }
      ];

      store.dispatch(FilesActions.requestWorkflowFilePreload(mockWorkflowInputs));
      expect(store.getActions()).toEqual(expectedActions);

    });


  });
});
