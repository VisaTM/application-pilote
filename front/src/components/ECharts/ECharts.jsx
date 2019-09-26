import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ClusterChart from './ClusterChart.jsx'
import BarChart from './BarChart.jsx'
import DocumentsList from './DocumentsList.jsx'
import DocumentModal from './DocumentModal.jsx'
import NotificationArea from '../NotificationArea/NotificationArea.jsx';

import ClustersActions from '../../actions/ClustersActions';

import './ECharts.scss';

class ECharts extends Component {


  componentDidMount() {
    this.props.fetchClusterMetadata();
  }

  render() {
    return (
      <div>
        <NotificationArea />
        <div className="kmeans-visu">
          <ClusterChart />
          <BarChart className="kmeans-chart" />
        </div>
        <div className="document-list">
          <DocumentsList/>
        </div>
        <DocumentModal />
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => (
  {
    fetchClusterMetadata: () => dispatch(ClustersActions.fetchClusterMetadata()),
  }
);

ECharts.propTypes = {
  fetchClusterMetadata: PropTypes.func,
};




export default connect(null, mapDispatchToProps)(ECharts);

