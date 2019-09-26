import React, { Component } from 'react';
import {
  Button,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';

import FilesActions from '../../actions/FilesActions';

import './GalaxyFileUpload.scss';

export class GalaxyFileUpload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      files: []
    }
  }

  onDrop(files) {
    this.setState({ files });
  }

  onCancel() {
    this.setState({
      files: []
    });
  }

  handleUpload() {
    this.props.requestFilesUpload(this.state.files);
    this.setState({
      files: []
    });
  }

  render() {
    const files = this.state.files.map((file, idx) => (
      <li key={idx}>
        {file.name} - {file.size} octets
      </li>
    ))
    const isUploadDisabled = this.state.files.length > 0 ? false : true;
    return (
      <section>
        <h2>
          Veuillez choisir un fichier à télécharger
        </h2>
        <Dropzone
          onDrop={this.onDrop.bind(this)}
          onFileDialogCancel={this.onCancel.bind(this)}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className='upload-component'>
              <input {...getInputProps()} />
              <p>Glissez vos fichiers ici, ou cliquez pour sélectionner vos fichiers</p>
            </div>
          )}
        </Dropzone>
        <aside>
          <h4>Fichiers</h4>
          <ul>{files}</ul>
        </aside>
        <Button bsStyle="primary" bsSize="large"
          onClick={!isUploadDisabled ? this.handleUpload.bind(this) : null}
          disabled={isUploadDisabled}>
          Télécharger
        </Button>
      </section>
    );
  }
}


const mapDispatchToProps = (dispatch) => (
  {
    requestFilesUpload: (filesData) => dispatch(FilesActions.requestFilesUpload(filesData)),
  }
);


GalaxyFileUpload.propTypes = {
  requestFilesUpload: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(GalaxyFileUpload);
