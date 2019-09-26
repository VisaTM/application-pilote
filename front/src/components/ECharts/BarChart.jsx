import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import TermsActions from '../../actions/TermsActions';
import SourcesActions from '../../actions/SourcesActions';
import ChartsActions from '../../actions/ChartsActions';


export class BarChart extends Component {


  handleTermClick(params) {
    switch (this.props.chartType) {
      case 'terms':
        this.props.selectTerm(params.dataIndex);
        break;
      case 'sources':
        this.props.selectSource(params.dataIndex);
        break;
      default:
        this.props.selectTerm(params.dataIndex);
    }
  }

  handleButtonClick(e) {
    const chart = e.target.value;
    this.props.chooseChart(chart)
  }

  render() {
    //console.log("render terms chart");
    return (
      <div className="kmeans-chart" >
        <button type='button' value="terms" onClick={this.handleButtonClick.bind(this)}>Termes</button>
        <button type='button' value="sources" onClick={this.handleButtonClick.bind(this)}>Revues</button>
        <ReactEcharts option={this.props.chartOptions} style={{ width: '100%', height: '600px' }} onEvents={{ 'click': this.handleTermClick.bind(this) }} />
      </div>
    )
  }
}
const mapStateToProps = (state) => (
  {
    selectedCluster: state.clusters.selected,
    chartOptions: state.charts.barChartOptions,
    chartType: state.charts.chartType
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    selectSource: (termId) => dispatch(SourcesActions.selectSource(termId)),
    selectTerm: (termId) => dispatch(TermsActions.selectTerm(termId)),
    chooseChart: (chart) => dispatch(ChartsActions.chooseBarChart(chart))
  }
);
BarChart.propTypes = {
  selectedCluster: PropTypes.object,
  chartOptions: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(BarChart);
