import 'whatwg-fetch';

const ISTEX_API_URL = process.env.REACT_APP_ISTEX_API;
const GALAXY_API_URL = process.env.REACT_APP_GALAXY_API;
const API_HEADERS = {
  'Content-Type': 'application/json;charset=UTF-8',
}

const getMethod = {
  method: 'get',
  headers: API_HEADERS
}

/*const postMethod = {
  method: 'post',
}*/

let API = {

  async fetchClusterMetadata() {
    try {
      return await fetch(`${GALAXY_API_URL}/clusters`, getMethod);
    } catch (err) {
      throw new Error(`Une erreur s'est produire lors de la réception des données : ${err.message}`);
    }
  },

  async fetchClusterDataById(id) {
    try {
      return await fetch(`${GALAXY_API_URL}/clusters/${id}`, getMethod);
    } catch (err) {
      throw new Error(`Une erreur s'est produire lors de la réception des données du cluster ${id}: ${err.message}`);
    }
  },

  async fetchDocumentMetadata(arkId) {
    try {
      return await fetch(`${ISTEX_API_URL}/${arkId}/record.json`);
    } catch (err) {
      throw new Error(`Une erreur s'est produire lors des métadonnées du document ${arkId}: ${err.message}`);
    }
  },

  /*

  Istex API calls

*/

  async requestIstexNb(query) {
    let formData = new FormData();
    formData.append('query', query);
    try {
      return await fetch(`${GALAXY_API_URL}/istex/`,{ method: 'post', body: formData});
    } catch (err) {
      throw new Error(`Une erreur s'est produire lors de l'execution de la requete ${query}: ${err.message}`);
    }
  },


  async downloadFilesIstex(query) {
    let formData = new FormData();
    formData.append('query', query);
    try {
      return await fetch(`${GALAXY_API_URL}/istex/download`,{ method: 'post', body: formData});
    } catch (err) {
      throw new Error(`Une erreur s'est produire lors de la préparation des documents : ${err.message}`);
    }
  },

  /*

    Galaxy API calls

  */
  async requestFilesUpload(filesData) {
    var formData = new FormData();
    formData.append('file', filesData[0]);

    try {
      return await fetch(`${GALAXY_API_URL}/files/upload`, { method: 'post', body: formData});
    } catch (err) {
      throw new Error(`Une erreur s'est produire lors de l'upload des fichiers': ${err.message}`);
    }
  },

  async requestWorkflowsList(workflowType="") {
    try {
      return await fetch(`${GALAXY_API_URL}/workflows/${workflowType}`, getMethod);
    } catch (err) {
      throw new Error(`Une erreur s'est produire lors de la réception de la liste des workflows Galaxy': ${err.message}`);
    }
  },

  async requestWorkflowInputs(workflowId) {
    try {
      return await fetch(`${GALAXY_API_URL}/workflows/${workflowId}/inputs`, getMethod);
    } catch (err) {
      throw new Error(`Une erreur s'est produire lors de la réception de la liste des inputs du workflow ${workflowId} ': ${err.message}`);
    }
  },

  async requestWorkflowOutputs(workflowId) {
    try {
      return await fetch(`${GALAXY_API_URL}/workflows/${workflowId}/outputs`, getMethod);
    } catch (err) {
      throw new Error(`Une erreur s'est produire lors de la réception de la liste des outputs du workflow ${workflowId} ': ${err.message}`);
    }
  },

  async requestUploadedFilesList(folderName = null) {
    const url = folderName ? `${GALAXY_API_URL}/files/folder/${folderName}` : `${GALAXY_API_URL}/files/`
    try {
      return await fetch(url, getMethod);
    } catch (err) {
      throw new Error(`Une erreur s'est produire lors de la réception de la liste des fichiers Galaxy': ${err.message}`);
    }
  },

  async requestWorkflowExecution(workflowId, files, params) {
    var formData = new FormData();
    try {
      formData.append('workflow_id', workflowId);
      formData.append('files', JSON.stringify(files));
      formData.append('params', JSON.stringify(params));

      return await fetch(`${GALAXY_API_URL}/workflows/execute`, { method: 'post', body: formData});
    } catch (err) {
      throw new Error(`Une erreur s'est produire lors de l'invocation du workflow ${workflowId}': ${err.message}`);
    }
  },

  async requestAllJobsList() {
    try {
      return await fetch(`${GALAXY_API_URL}/workflows/jobs`, getMethod);
    } catch (err) {
      throw new Error(`Une erreur s'est produire lors de la réception de la liste de tous les jobs Galaxy': ${err.message}`);
    }
  },

  async requestJobsList(workflowId) {
    let query_string = `workflow_id=${workflowId}`;

    try {
      return await fetch(`${GALAXY_API_URL}/workflows/jobs?${query_string}`, getMethod);
    } catch (err) {
      throw new Error(`Une erreur s'est produire lors de la réception de la liste des jobs Galaxy': ${err.message}`);
    }
  },

  async requestJobResult(resultId) {
    try {
      return await fetch(`${GALAXY_API_URL}/workflows/results/${resultId}`, getMethod);
    } catch (err) {
      throw new Error(`Une erreur s'est produire lors de la réception de la liste des jobs Galaxy': ${err.message}`);
    }
  },

}

export default API;
