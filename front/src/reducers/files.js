import {
  RECEIVE_FILES_UPLOAD_SUCCESS,
  RECEIVE_UPLOADED_FILES_LIST_SUCCESS,
  REQUEST_UPLOADED_FILE_SELECTION,
  REQUEST_WORKFLOW_FILE_PRELOAD,
} from '../constants';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const initialState = {
  uploadedFiles: [],
  lastUploadedFileId: null,
  selectedUploadedFiles: {},
  isFileUploaded: false,
  areFilesSelected: false,
}

const files = (state = initialState, action) => {
  switch (action.type) {
    // File Upload
    case RECEIVE_FILES_UPLOAD_SUCCESS:
      return {
        ...state,
        uploadedFiles: [...state.uploadedFiles, action.uploadedFile],
        lastUploadedFileId: action.fileId,
        isFileUploaded: true
      }
    // Uploaded Files list
    case RECEIVE_UPLOADED_FILES_LIST_SUCCESS:
      return {
        ...state,
        uploadedFiles: action.uploadedFiles
      }
    case REQUEST_UPLOADED_FILE_SELECTION:
      let filesList = Object.assign(state.selectedUploadedFiles)
      let areFilesSelected = true;
      filesList[action.fileName] = action.fileId;

      // Checks if all the files have been selected
      for (let fileName in filesList) {
        if (filesList[fileName] === null) {
          areFilesSelected = false;
          break;
        }
      }

      return {
        ...state,
        selectedUploadedFiles: filesList,
        areFilesSelected
      }
    // Preloaded file informations
    case REQUEST_WORKFLOW_FILE_PRELOAD:
      return {
        ...state,
        selectedUploadedFiles: action.preloadFiles
      }

    default:
      return state;
  }
}


export default files;
