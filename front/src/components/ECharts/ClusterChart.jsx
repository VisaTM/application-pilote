import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ClustersActions from '../../actions/ClustersActions';


export class ClusterChart extends Component {


  handleClusterClick(params) {
    //console.log(params);
    if (params.data[3]) {
      const cluster = this.props.clusterData.find(c => c["Id"] === params.data[3])
      this.props.selectCluster(cluster);
    }

  }


  handleRangeChange = (e) => {
    this.props.selectRange(e.target.value)
  }

  render() {
    //console.log("render clusters chart");
    return (
      <div className="kmeans-chart" >
        <input className="range-selector" type="range" min="0" max="1" step="0.01" onChange={this.handleRangeChange.bind(this)} value={this.props.selectedRange} />
        <span>{this.props.selectedRange}</span>
        <ReactEcharts option={this.props.chartOptions} style={{ width: '100%', height: '600px' }} onEvents={{ 'click': this.handleClusterClick.bind(this) }} />
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    clusterData: state.clusters.list,
    selectedCluster: state.clusters.selected,
    selectedRange: state.clusters.selectedRange,
    chartOptions: state.charts.clusterChartOptions
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    selectCluster: (cluster) => dispatch(ClustersActions.selectCluster(cluster)),
    selectRange: (range) => dispatch(ClustersActions.selectRange(range))
  }
);

ClusterChart.propTypes = {
  clusterData: PropTypes.arrayOf(PropTypes.object),
  selectedCluster: PropTypes.object,
  chartOptions: PropTypes.object,
  selectedRange: PropTypes.number,
  selectCluster: PropTypes.func,
  selectRange: PropTypes.func
};




export default connect(mapStateToProps, mapDispatchToProps)(ClusterChart);

