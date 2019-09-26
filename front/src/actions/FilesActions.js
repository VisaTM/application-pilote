import {
  REQUEST_FILES_UPLOAD,
  RECEIVE_FILES_UPLOAD_ERROR,
  RECEIVE_FILES_UPLOAD_SUCCESS,

  REQUEST_UPLOADED_FILES_LIST,
  RECEIVE_UPLOADED_FILES_LIST_ERROR,
  RECEIVE_UPLOADED_FILES_LIST_SUCCESS,

  REQUEST_UPLOADED_FILE_SELECTION,

  REQUEST_WORKFLOW_FILE_PRELOAD,
} from '../constants';

import API from '../api';



let FilesActions = {


  requestFilesUpload(filesData) {
    return (dispatch) => {
      dispatch({ type: REQUEST_FILES_UPLOAD });
      return API.requestFilesUpload(filesData)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          }
        })
        .then((data) => {
          const fileId = data.id ? data.id : null;
          dispatch({ type: RECEIVE_FILES_UPLOAD_SUCCESS, uploadedFile: data, fileId, message: 'File successfuly uploaded' });
        })
        .catch((error) => {
          dispatch({ type: RECEIVE_FILES_UPLOAD_ERROR, error: error.message })
        });


    };
  },

  requestUploadedFilesList(folderName) {
    return (dispatch) => {
      dispatch({ type: REQUEST_UPLOADED_FILES_LIST });
      return API.requestUploadedFilesList(folderName)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          }
        })
        .then((data) => {
          dispatch({ type: RECEIVE_UPLOADED_FILES_LIST_SUCCESS, uploadedFiles: data });
        })
        .catch((error) => {
          dispatch({ type: RECEIVE_UPLOADED_FILES_LIST_ERROR, error: error.message })
        });


    };

  },

  selectUploadedFile(fileName, fileId) {
    return (dispatch) => {
      dispatch({ type: REQUEST_UPLOADED_FILE_SELECTION, fileName, fileId });
    };

  },

  requestWorkflowFilePreload(workflowInputs) {
    return (dispatch) => {
      if (workflowInputs) {
        const preloadFiles = {}
        // For each input in the workflow description, create a new property in the preloadFiles object
        workflowInputs.filter(input => input["type"] === "file")
          .forEach((f) => {
            preloadFiles[f.name] = null
          });
        dispatch({ type: REQUEST_WORKFLOW_FILE_PRELOAD, preloadFiles });
      }

    };
  }



};

export default FilesActions;
