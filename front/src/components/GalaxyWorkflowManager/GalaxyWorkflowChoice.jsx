import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FormControl,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

import WorkflowsActions from '../../actions/WorkflowsActions';

import './GalaxyWorkflowChoice.scss';

export class GalaxyWorkflowChoice extends Component {



  handleWorkflowChange(e) {
    this.props.selectWorkflow(e.target.value)
  }

  render() {

    const workflows = this.props.workflowsList.map(w => (
      <option key={w['id']} value={w['id']}>{w['name']}</option>
    ))
    workflows.unshift(<option key="0" value="" disabled>--Veuillez choisir un workflow--</option>)

    if(this.props.workflowsList.length > 1) {
      return (
        <section id="galaxy-workflow-choice">
          <h2>
            Veuillez choisir un workflow à exécuter
          </h2>
          <FormControl
            componentClass="select"
            placeholder="select"
            name="workflow"
            id="workflow-selector"
            defaultValue=""
            onChange={this.handleWorkflowChange.bind(this)}>
            {workflows}
          </FormControl>
        </section>
      );
    } else if(this.props.workflowsList.length === 1) {
      this.props.selectWorkflow(this.props.workflowsList[0]['id'])
      return (
        <section id="galaxy-workflow-choice">
          <h2>
            Veuillez renseigner les paramètres
          </h2>
        </section>
      )

    } else {
      return (
        <section id="galaxy-workflow-choice">
          <h2>
            Chargement ....
          </h2>
        </section>
      )
    }
  }
}

const mapStateToProps = (state) => (
  {
    workflowsList: state.workflows.workflowsList,
  }
);


const mapDispatchToProps = (dispatch) => (
  {
    selectWorkflow: (workflowId) => dispatch(WorkflowsActions.selectWorkflow(workflowId)),
  }
);

GalaxyWorkflowChoice.propTypes = {
  workflowsList: PropTypes.array,
  selectWorkflow: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(GalaxyWorkflowChoice);
