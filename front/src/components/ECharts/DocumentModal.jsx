import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DocumentsActions from '../../actions/DocumentsActions';


class DocumentModal extends Component {

  render() {
    Modal.setAppElement("#modal")

    let authorsList,
      affiliationsList,
      identifiers,
      documentType,
      source,
      keywords,
      language,
      title,
      abstract = '';

    if (this.props.documentMedata) {
      if (this.props.documentMedata.author) {
        this.props.documentMedata.author.forEach(author => {
          authorsList += author.name + ' ; ';
          affiliationsList += author.affiliations.join(' - ') + ' ; ';
        });
      }

      if (this.props.documentMedata.host) {
        documentType = this.props.documentMedata.host.genre.join(' ; ')

        source += this.props.documentMedata.host.title ? this.props.documentMedata.host.title + ' ; ' : '';
        source += this.props.documentMedata.host.isnn ? "ISNN " + this.props.documentMedata.host.isnn.join(' - ') + ' ; ' : '';
        source += this.props.documentMedata.host.isbn ? "ISBN " + this.props.documentMedata.host.isbn.join(' - ') + ' ; ' : '';
        source += this.props.documentMedata.copyrightDate ? this.props.documentMedata.copyrightDate + ' ; ' : '';
        source += this.props.documentMedata.host.volume ? "vol. " + this.props.documentMedata.host.volume + ' ; ' : '';
        source += this.props.documentMedata.host.issue ? "n°" + this.props.documentMedata.host.issue + ' ; ' : '';

      }

      language = this.props.documentMedata.language ? this.props.documentMedata.language.join(' - ') + ' ; ' : '';

      if (this.props.documentMedata.subject) {
        this.props.documentMedata.subject.forEach(keyword => {
          keywords += keyword.value + ' ; ';
        });
      }

      identifiers += this.props.documentMedata.doi ? "DOI " + this.props.documentMedata.doi + ' ; ' : '';
      identifiers += this.props.documentMedata.pmid ? "PMID " + this.props.documentMedata.pmid + ' ; ' : '';
      identifiers += this.props.documentMedata.ark ? this.props.documentMedata.ark + ' ; ' : '';

      title = this.props.documentMedata.title ? this.props.documentMedata.title : '';
      abstract = this.props.documentMedata.abstract ? this.props.documentMedata.abstract : '';
    }
    return (
      <Modal
        isOpen={this.props.showModal}
        contentLabel="Minimal Modal Example"
      >
        <h1>{title}</h1>
        <h4>Authors</h4>
        <span>{authorsList}</span>
        <h4>Affiliations</h4>
        <span>{affiliationsList}</span>
        <h4>Document Type</h4>
        <span>{documentType}</span>
        <h4>Source</h4>
        <span>{source}</span>
        <h4>Language</h4>
        <span>{language}</span>
        <h4>Abstract</h4>
        <span>{abstract}</span>
        <h4>Keywords</h4>
        <span>{keywords}</span>
        <h4>Identifiers</h4>
        <span>{identifiers}</span>
        <button onClick={this.props.hideDocumentModal}>Close Modal</button>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => (
  {
    showModal: state.documents.isModalOpen,
    documentMedata: state.documents.selectedMetadata
  }
);


const mapDispatchToProps = (dispatch) => (
  {
    hideDocumentModal: () => dispatch(DocumentsActions.hideDocumentModal()),
  }
);


DocumentModal.propTypes = {
  isModalOpen: PropTypes.bool,
  documentMedata: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentModal);

