import {
  RECEIVE_FILES_UPLOAD_SUCCESS,
  RECEIVE_UPLOADED_FILES_LIST_SUCCESS,
  REQUEST_UPLOADED_FILE_SELECTION,
  REQUEST_WORKFLOW_FILE_PRELOAD,
} from '../../constants';
import reducer from '../../reducers/files';


const initialState = {
  uploadedFiles: [],
  lastUploadedFileId: null,
  selectedUploadedFiles: {},
  isFileUploaded: false,
  areFilesSelected: false,
};


describe('reducers', () => {
  describe('files', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    });

    it('should handle RECEIVE_FILES_UPLOAD_SUCCESS', () => {
      const mockLastUploadedFileId = "9ddb41e1fa331d3s";
      const mockedUploadedFile = {
        id: mockLastUploadedFileId,
        name: "/ndocMetaData.txt"
      }

      const expectedUploadedFiles = [{
        id: mockLastUploadedFileId,
        name: "/ndocMetaData.txt"
      }];

      expect(reducer(initialState, {
        type: RECEIVE_FILES_UPLOAD_SUCCESS,
        uploadedFile: mockedUploadedFile,
        fileId: mockLastUploadedFileId
      })).toEqual({
        ...initialState,
        uploadedFiles: expectedUploadedFiles,
        lastUploadedFileId: mockLastUploadedFileId,
        isFileUploaded: true
      });
    });


    it('should handle RECEIVE_UPLOADED_FILES_LIST_SUCCESS', () => {
      const expectedUploadedFiles = [{
        id: "9ddb41e1fa331d3s",
        name: "/ndocMetaData.txt"
      },
      {
        id: "f2db41e1fa331b3e",
        name: "/ndocDocsMots.txt"
      }];

      expect(reducer(initialState, {
        type: RECEIVE_UPLOADED_FILES_LIST_SUCCESS,
        uploadedFiles: expectedUploadedFiles,
      })).toEqual({
        ...initialState,
        uploadedFiles: expectedUploadedFiles
      });

    });

    it('should handle REQUEST_UPLOADED_FILE_SELECTION with areFilesSelected=false', () => {
      const mockInitialState = {
        ...initialState,
        selectedUploadedFiles: {
          medatada_file: null,
          docterm_file: null
        }
      }
      const mockFileName = "medatada_file";
      const mockFileId = "9ddb41e1fa331d3s";

      const expectedSelectedUploadedFiles = {
        medatada_file: "9ddb41e1fa331d3s",
        docterm_file: null
      }


      expect(reducer(mockInitialState, {
        type: REQUEST_UPLOADED_FILE_SELECTION,
        fileName: mockFileName,
        fileId: mockFileId,
      })).toEqual({
        ...mockInitialState,
        areFilesSelected: false,
        selectedUploadedFiles: expectedSelectedUploadedFiles
      });


    });

    it('should handle REQUEST_UPLOADED_FILE_SELECTION with areFilesSelected=true', () => {
      const mockInitialState = {
        ...initialState,
        selectedUploadedFiles: {
          medatada_file: null,
          docterm_file: "f2db41e1fa331b3e"
        }
      }
      const mockFileName = "medatada_file";
      const mockFileId = "9ddb41e1fa331d3s";

      const expectedSelectedUploadedFiles = {
        medatada_file: "9ddb41e1fa331d3s",
        docterm_file: "f2db41e1fa331b3e"
      }


      expect(reducer(mockInitialState, {
        type: REQUEST_UPLOADED_FILE_SELECTION,
        fileName: mockFileName,
        fileId: mockFileId,
      })).toEqual({
        ...mockInitialState,
        areFilesSelected: true,
        selectedUploadedFiles: expectedSelectedUploadedFiles
      });


    });



    it('should handle REQUEST_WORKFLOW_FILE_PRELOAD', () => {
      const mockPreloadFiles = {
        medatada_file: null,
        docterm_file: null
      }


      expect(reducer(initialState, {
        type: REQUEST_WORKFLOW_FILE_PRELOAD,
        preloadFiles: mockPreloadFiles,
      })).toEqual({
        ...initialState,
        selectedUploadedFiles: mockPreloadFiles
      });


    });

  });

});
