import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactTable from "react-table";

import "react-table/react-table.css";

import JobsActions from '../../actions/JobsActions';
import {
  getWorkflowFromId,
} from '../../reducers';


import './GalaxyWorkflowJobList.scss';

export class GalaxyWorkflowJobList extends Component {

  componentDidMount() {
    this.props.requestJobsList(this.props.selectedWorkflowId);
  }

  createResultLink(row) {
    if (row.original && row.original.id && row.original.state === "ok") {
      let url = `/results/${row.original.id}`;
      return (
        <span>
          <Link to={url} target="_blank">Lien</Link>
        </span>
      )
    }
    else {
      return (
        <span>
        </span>
      )
    }
  }

  getWorkflowName(row) {
    if(row.original && row.original.workflow_id) {
      const workflow = this.props.workflowFromId(row.original.workflow_id);
      return workflow.name
    }
    return null;
  }

  render() {
    const translations = {
      previousText: 'Précédent',
      nextText: 'Suivant',
      loadingText: 'Chargement...',
      rowsText: 'lignes',
      noDataText: 'Aucune donnée',
      pageText: 'Page',
      ofText: 'sur',
    };
    return (
      <section className="workflow-jobs">
        <ReactTable
          {...translations}
          data={this.props.jobsList}
          columns={[
            {
              Header: "Nom du Job",
              accessor: "wrapped.name"
            },
            {
              Header: "Etat",
              accessor: "state"
            },
            {
              Header: "Date de mise à jour",
              accessor: "wrapped.update_time"
            },
            {
              Header: "Lien du résultat",
              accessor: "id",
              Cell: row => this.createResultLink(row)
            }
          ]
          }
          defaultSorted={[
            {
              id: "wrapped.update_time",
              desc: true
            }
          ]}
          loading={this.props.loadingJobs}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </section>
    );
  }
}

const mapStateToProps = (state) => (
  {
    workflowsList: state.workflows.workflowsList,
    selectedWorkflowId: state.workflows.selectedWorkflowId,
    jobsList: state.jobs.jobsList,
    loadingJobs: state.jobs.loadingJobs,
    workflowFromId: (workflowId) => getWorkflowFromId(state, workflowId)
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    requestJobsList: (workflowId) => dispatch(JobsActions.requestJobsList(workflowId)),
  }
);



GalaxyWorkflowJobList.propTypes = {
  jobsList: PropTypes.array,
  requestJobsList: PropTypes.func,
  selectedWorkflowId: PropTypes.string,
  loadingJobs: PropTypes.bool,
  workflowFromId: PropTypes.func,
};


export default connect(mapStateToProps, mapDispatchToProps)(GalaxyWorkflowJobList);
