import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';
import {
  Button, OverlayTrigger, Popover,
  Nav, NavItem
} from 'react-bootstrap';
import { FaInfoCircle } from 'react-icons/fa';

import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';
import IstexActions from '../../actions/IstexActions';
import NotificationArea from "../NotificationArea/NotificationArea";
import { connect } from 'react-redux';

import 'react-toastify/dist/ReactToastify.css';
import './Istex.scss';

const popoverRequestClassic = (
  <Popover
    id="popover-request-classic"
    title={<span> Recherche classique</span>}
  >
    Pour saisir votre requête de recherche, vous pouvez
    vous aider du <a href="http://demo.istex.fr/" target="_blank" rel="noopener noreferrer">démonstrateur </a> ou de la <a href="https://doc.istex.fr/tdm/requetage/" target="_blank" rel="noopener noreferrer">documentation ISTEX</a> </Popover>
);

const popoverRequestUpload = (
  <Popover
    id="popover-request-classic"
    title={<span> Uploader un fichier de corpus</span>}
  >
    Cette fonctionnalité est en cours de développement et sera disponible prochainement !
  </Popover>
);


class Istex extends Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      query: '',
      nb_doc: 0,
      typing: false,
      typingTimeout: 0,
    };
    this.state = this.defaultState;
    this.isDisabled = this.isDisabled.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  render() {

    return (
      <main className="galaxy">
        <NotificationArea />
        <section>
        <a href="https://www.istex.fr/" >
          <img src="https://www.istex.fr/wp-content/themes/istex/images/istex_logo.svg"
            alt="ISTEX" title="Initiative d'excellence en information scientifique et technique"
            width="200" height="50" />
        </a>
        </section>
        <section>
          <Nav
            bsStyle="tabs"
            activeKey={this.state.activeKey}
          >
            <NavItem eventKey="1" active={true} >
              Recherche classique
              &nbsp;
            <OverlayTrigger
                trigger="click"
                rootClose
                placement="left"
                overlay={popoverRequestClassic}
              >
              <FaInfoCircle />
              </OverlayTrigger>
            </NavItem>
            <NavItem eventKey="2" active={false} >
              Upload un fichier corpus
              &nbsp;
            <OverlayTrigger
                trigger="click"
                rootClose
                placement="right"
                overlay={popoverRequestUpload}
              >
              <FaInfoCircle />
              </OverlayTrigger>
            </NavItem>
          </Nav>
        </section>
        <Textarea
          className="form-control"
          placeholder={'Saisissez votre requête Istex ici'}
          name="query"
          id={`area-${this.state.activeKey}`}
          rows="3"
          style={{ "margin": "5px" }}
          value={this.state.query}
          onChange={this.handleQueryChange}
        />

        <Button
          type="submit" bsStyle="primary" bsSize="large"
          disabled={this.isDisabled()}
          onClick={this.handleSubmit}
        >
          Télécharger votre corpus dans Galaxy
        </Button>
        <ToastContainer />
        <section>
          Nombre de Documents : {this.props.nb_doc}
        </section>

        {/*Liste des corpus accessible ici : <a href={GALAXY_API_URL + "/corpus"}>Liste Corpus</a>*/}

      </main>

    );
  }

  handleSubmit(event) {
    this.props.downloadFilesIstex(this.state.query);
    toast.info('🚀 Requête envoyée à Galaxy!\n Création de votre fichier corpus en cours', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  }

  isDisabled() {
    return (!this.state.query || this.state.query.length < 1 || this.props.nb_doc === 0 || !this.props.nb_doc);
  }

  handleQueryChange(event) {
    const self = this;
    if (event) {
      if (self.state.typingTimeout) {
        clearTimeout(self.state.typingTimeout);
      }

      self.setState({
        query: event.query || event.target.value, typing: false,
        typingTimeout: setTimeout(function () {
          self.props.requestIstexNb(self.state.query);
        }, 1000)
      });
    }
  }

}

const mapStateToProps = (state) => (
  {
    query: state.istex.jobResult,
    nb_doc: state.istex.nb_doc,
  }
);


const mapDispatchToProps = (dispatch) => (
  {
    requestIstexNb: (query) => dispatch(IstexActions.requestIstexNb(query)),
    downloadFilesIstex: (query) => dispatch(IstexActions.downloadFilesIstex(query)),
  }
);

Istex.propTypes = {
  query: PropTypes.string,
  nb_doc: PropTypes.number
};
export default connect(mapStateToProps, mapDispatchToProps)(Istex);
