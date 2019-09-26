import React, { Component } from 'react';
import ReactTable from "react-table";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaSyncAlt } from 'react-icons/fa';
import {
  Button,
} from 'react-bootstrap';

import GalaxyFileUpload from '../GalaxyFileUpload/GalaxyFileUpload.jsx'
import NotificationArea from '../NotificationArea/NotificationArea.jsx';

import FilesActions from '../../actions/FilesActions';


import './GalaxyFileManager.scss';

export class GalaxyFileManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      files: []
    }
  }

  componentDidMount() {
    this.props.requestUploadedFilesList();
  }


  onReloadClick() {
    this.props.requestUploadedFilesList();
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
      <main className="galaxy" id="file-manager">
        <NotificationArea />
        <GalaxyFileUpload />
        <section className="files-list">
          <h2>
            Fichiers Téléchargés
          </h2>
          <Button
            bsStyle="primary"
            onClick={this.onReloadClick.bind(this)}>
            Rafraichir {' '} <FaSyncAlt />
          </Button>
          <ReactTable
            {...translations}
            data={this.props.uploadedFiles}
            columns={[
              {
                Header: "Nom",
                accessor: "name"
              }
            ]
            }
            defaultPageSize={10}
            className="-striped -highlight"
          />
        </section>
      </main>
    );
  }
}


const mapStateToProps = (state) => (
  {
    lastUploadedFileId: state.files.lastUploadedFileId,
    uploadedFiles: state.files.uploadedFiles,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    requestUploadedFilesList: () => dispatch(FilesActions.requestUploadedFilesList()),
  }
);


GalaxyFileManager.propTypes = {
  selectedUploadedFileId: PropTypes.string,
  lastUploadedFileId: PropTypes.string,
  uploadedFiles: PropTypes.array,
  selectUploadedFile: PropTypes.func,
  requestUploadedFilesList: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(GalaxyFileManager);
