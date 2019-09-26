import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getWorkflowFromId,
} from '../../reducers';
import FilesActions from '../../actions/FilesActions';
import WorkflowsActions from '../../actions/WorkflowsActions';
import {
  workflowFileSelectorGenerator,
  workflowParameterGenerator
} from '../../utils/workflowInputsGenerator'

import './GalaxyWorkflowParameters.scss';

export class GalaxyWorkflowParameters extends Component {

  componentDidMount() {
    this.props.requestUploadedFilesList();
  }

  handleFileSelection(e) {
    this.props.selectUploadedFile(e.target.name, e.target.value)
  }

  handleParameterChange(e) {
    this.props.requestWorkflowParameterChange(e.target.name, e.target.value)
  }

  render() {
    if (this.props.selectedWorkflowId !== null) {
      let formInputParameters = [];
      let formInputFiles = [];

      this.props.selectedWorkflowInputs
        .forEach((input) => {
          if (input["type"] === "file") {
            formInputFiles.push(
              workflowFileSelectorGenerator(input, this.props.uploadedFiles, this.handleFileSelection.bind(this))
            );
          } else {
            formInputParameters.push(
              workflowParameterGenerator(
                input,
                this.handleParameterChange.bind(this),
                this.props.selectedWorkflowParameters[input["name"]]
                )
            );
          }

        })

      return (
        <section className="workflow-parameters">
          <h4>Fichiers en entrée</h4>
          {formInputFiles}
          <h4>Paramètres</h4>
          {formInputParameters}
        </section>
      );
    } else {
      return (
        <section>
        </section>
      )
    }
  }
}



GalaxyWorkflowParameters.propTypes = {
  selectedWorkflowId: PropTypes.string,
  folderName: PropTypes.string,
  uploadedFiles: PropTypes.array,
  selectedUploadedFiles: PropTypes.object,
  selectedWorkflowInputs: PropTypes.array,
  workflowFromId: PropTypes.func
};

const mapStateToProps = (state) => (
  {
    selectedWorkflowId: state.workflows.selectedWorkflowId,
    selectedWorkflowInputs: state.workflows.selectedWorkflowInputs,
    selectedWorkflowParameters: state.workflows.selectedWorkflowParameters,
    selectedUploadedFiles: state.files.selectedUploadedFiles,
    uploadedFiles: state.files.uploadedFiles,
    workflowFromId: (workflowId) => getWorkflowFromId(state, workflowId)
  }
);


const mapDispatchToProps = (dispatch) => (
  {
    selectUploadedFile: (fileName, fileId) => dispatch(FilesActions.selectUploadedFile(fileName, fileId)),
    requestWorkflowParameterChange: (paramName, paramValue) => dispatch(WorkflowsActions.requestWorkflowParameterChange(paramName, paramValue)),
    requestUploadedFilesList: (folderName) => dispatch(FilesActions.requestUploadedFilesList(folderName)),
  }
);


export default connect(mapStateToProps, mapDispatchToProps)(GalaxyWorkflowParameters);

