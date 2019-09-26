import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ReactTable from "react-table";
import "react-table/react-table.css";

import {
  getDocumentsList,
} from '../../reducers';

import DocumentsActions from '../../actions/DocumentsActions';

export const DocumentsList = ({ documentsList, selectedTerm, selectedCluster, fetchDocumentMetadata, showDocumentModal }) => (
  <Fragment>
    <h3>{selectedCluster["Name"]}: {selectedTerm["Term"]}</h3>
    <ReactTable
      getTdProps={(state, rowInfo, column, instance) => {
        return {
          onClick: (e, handleOriginal) => {
            if (rowInfo) {
              fetchDocumentMetadata(rowInfo.original);
              showDocumentModal();
            }
          }
        }
      }}
      data={documentsList}
      columns={[
        {
          Header: "Title",
          accessor: "Title"
        },
        {
          Header: "Author",
          accessor: "Author"
        },
        {
          Header: "Source",
          accessor: "Source"
        },
        {
          Header: "Publication date",
          accessor: "Publication date"
        }
      ]
      }
      defaultPageSize={10}
      className="-striped -highlight"
    />
  </Fragment>

);

const mapStateToProps = (state) => (
  {
    selectedTerm: state.terms.selected,
    selectedCluster: state.clusters.selected,
    documentsList: getDocumentsList(state)
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    fetchDocumentMetadata: (selected) => dispatch(DocumentsActions.fetchDocumentMetadata(selected)),
    showDocumentModal: () => dispatch(DocumentsActions.showDocumentModal()),
  }
);


DocumentsList.propTypes = {
  selectedCluster: PropTypes.object,
  selectedTerm: PropTypes.object,
  documentsList: PropTypes.array,
  fetchDocumentMetadata: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsList);
