import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaRegCircle, FaRegCheckCircle, FaSyncAlt } from 'react-icons/fa';
import {
  Button,
} from 'react-bootstrap';

import GalaxyWorkflowJobList from '../GalaxyJobs/GalaxyWorkflowJobList.jsx';
import NotificationArea from '../NotificationArea/NotificationArea.jsx';

import JobsActions from '../../actions/JobsActions';
import WorkflowsActions from '../../actions/WorkflowsActions';

import './GalaxyJobs.scss';

export class GalaxyJobs extends Component {

  componentDidMount() {
    this.props.selectWorkflow(null);
  }

  onRadioChange(e) {
    this.props.selectWorkflow(e.target.value);
    this.props.requestJobsList(e.target.value);
  }

  onReloadClick() {
    this.props.requestJobsList(this.props.selectedWorkflowId);
  }

  render() {

    let workflows = this.props.workflowsList.map((workflow) =>
      <div key={workflow["id"]}>
        <input type="radio" name="category" id={workflow["id"]} value={workflow["id"]}
          checked={this.props.selectedWorkflowId === workflow["id"]}
          onChange={this.onRadioChange.bind(this)} />
        <label htmlFor={workflow["id"]}>
          <FaRegCircle className="workflow-radio" />
          <FaRegCheckCircle className="workflow-radio-checked" />
          {' '}
          {workflow["name"]}
        </label>
      </div>
    );

    workflows.push(
      <div key="all">
        <input type="radio" name="category" id="all" value=""
          checked={this.props.selectedWorkflowId === null}
          onChange={this.onRadioChange.bind(this)} />
        <label htmlFor="all">
          <FaRegCircle className="workflow-radio" />
          <FaRegCheckCircle className="workflow-radio-checked" />
          {' '}
          Tous
        </label>
      </div>
    );

    return (
      <main className="galaxy">
        <NotificationArea />
        <h2>Liste des jobs</h2>
        <Button
          bsStyle="primary"
          onClick={this.onReloadClick.bind(this)}>
          Rafraichir {' '} <FaSyncAlt />
        </Button>
        <section className="workflow-selector">
          {/*workflows*/}
        </section>
        <GalaxyWorkflowJobList />
      </main>
    );
  }
}

const mapStateToProps = (state) => (
  {
    workflowsList: state.workflows.workflowsList,
    selectedWorkflowId: state.workflows.selectedWorkflowId,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    selectWorkflow: (workflowId) => dispatch(WorkflowsActions.selectWorkflow(workflowId)),
    requestJobsList: (WorkflowId) => dispatch(JobsActions.requestJobsList(WorkflowId))
  }
);


GalaxyJobs.propTypes = {
  requestJobsList: PropTypes.func,
  workflowsList: PropTypes.array,
  selectedWorkflowId: PropTypes.string,
};


export default connect(mapStateToProps, mapDispatchToProps)(GalaxyJobs);
