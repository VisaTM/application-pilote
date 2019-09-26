import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
} from 'react-bootstrap';

import GalaxyWorkflowChoice from '../GalaxyWorkflowManager/GalaxyWorkflowChoice.jsx';
import GalaxyWorkflowParameters from '../GalaxyWorkflowManager/GalaxyWorkflowParameters.jsx';
import NotificationArea from '../NotificationArea/NotificationArea.jsx';

import WorkflowsActions from '../../actions/WorkflowsActions';

import './ClusteringWorkflowLauncher.scss';

export class ClusteringWorkflowLauncher extends Component {

  componentDidMount() {
    this.props.requestWorkflowsList();
  }

  render() {

    const isButtonDisabled = (this.props.selectedWorkflowId !== null
      && this.props.areFilesSelected
      && this.props.areParametersValid) ? false : true;

    return (
      <main className="galaxy">
        <NotificationArea />
        <GalaxyWorkflowChoice />
        <GalaxyWorkflowParameters folderName="extraction"/>
        <br />
        <Button bsStyle="primary"
          bsSize="large"
          type="submit"
          onClick={this.props.requestWorkflowExecution}
          disabled={isButtonDisabled}>
          Exécuter
        </Button>
      </main>
    );
  }
}



ClusteringWorkflowLauncher.propTypes = {
  selectedWorkflowId: PropTypes.string,
  requestWorkflowExecution: PropTypes.func,
  areFilesSelected: PropTypes.bool,
  areParametersValid: PropTypes.bool,
  requestWorkflowsList: PropTypes.func,
};

const mapStateToProps = (state) => (
  {
    selectedWorkflowId: state.workflows.selectedWorkflowId,
    areFilesSelected: state.files.areFilesSelected,
    areParametersValid: state.workflows.areParametersValid,
  }
);


const mapDispatchToProps = (dispatch) => (
  {
    requestWorkflowExecution: () => dispatch(WorkflowsActions.requestWorkflowExecution()),
    requestWorkflowsList: (workflowType) => dispatch(WorkflowsActions.requestWorkflowsList(workflowType)),
  }
);



export default connect(mapStateToProps, mapDispatchToProps)(ClusteringWorkflowLauncher);

