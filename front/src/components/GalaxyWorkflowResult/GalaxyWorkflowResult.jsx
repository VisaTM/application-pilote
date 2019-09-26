import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import ClusterChart from '../ECharts/ClusterChart.jsx'
import BarChart from '../ECharts/BarChart.jsx'
import DocumentsList from '../ECharts/DocumentsList.jsx'
import DocumentModal from '../ECharts/DocumentModal.jsx'

import NotificationArea from '../NotificationArea/NotificationArea.jsx';
import JobsActions from '../../actions/JobsActions';

import './GalaxyWorkflowResult.scss';


let resultId;

export class GalaxyWorkflowResult extends Component {

  componentDidMount() {
    resultId = this.props.match.params.resultId;
    if (resultId) {
      this.props.requestJobResult(resultId)
    }

  }

  render() {
    return (
      <main className="job-result">
        <NotificationArea />
        <div className="kmeans-visu">
          <ClusterChart />
          <BarChart className="kmeans-chart" />
        </div>
        <div className="document-list">
          <DocumentsList />
        </div>
        <DocumentModal />
      </main>
    );
  }
}

const mapStateToProps = (state) => (
  {
    jobResult: state.jobs.jobResult,
  }
);


const mapDispatchToProps = (dispatch) => (
  {
    requestJobResult: (resultId) => dispatch(JobsActions.requestJobResult(resultId)),
  }
);


GalaxyWorkflowResult.propTypes = {
  jobResult: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  requestJobResult: PropTypes.func,
};


export default connect(mapStateToProps, mapDispatchToProps)(GalaxyWorkflowResult);
