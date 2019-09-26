import { combineReducers } from 'redux';

import charts from './charts';
import clusters from './clusters';
import documents, * as fromDocuments from './documents';
import files from './files';
import notifications from './notifications';
import jobs from './jobs';
import sources from './sources';
import terms from './terms';
import istex from './istex';
import workflows, * as fromWorkflows  from './workflows';

const rootReducer = combineReducers({
  charts,
  clusters,
  documents,
  files,
  notifications,
  jobs,
  sources,
  terms,
  istex,
  workflows
});


export default rootReducer;

export const getDocumentsList = (state) => fromDocuments.getDocumentsList(state.documents);
export const getWorkflowFromId = (state, workflowId) => fromWorkflows.getWorkflowFromId(state.workflows, workflowId);
