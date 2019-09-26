import React, { Component } from 'react';
import {
  Alert,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaWindowClose } from 'react-icons/fa';


import NotificationsActions from '../../actions/NotificationsActions';


import './NotificationArea.scss';

export class NotificationArea extends Component {

  handleDismiss() {
    this.props.requestNotificationDismiss();
  }

  render() {
    let alert = null;

    if (this.props.notificationMessage) {
      alert = <Alert bsStyle={this.props.notificationType}>
        <span className="alert-message">{this.props.notificationMessage}</span>
        <FaWindowClose className="close-button" onClick={this.handleDismiss.bind(this)} />
      </Alert>;
    }

    return (
      <section className="galaxy-notification">
        {alert}
      </section>
    );
  }
}
const mapStateToProps = (state) => (
  {
    notificationMessage: state.notifications.message,
    notificationType: state.notifications.type,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    requestNotificationDismiss: () => dispatch(NotificationsActions.requestNotificationDismiss()),
  }
);


NotificationArea.propTypes = {
  notificationMessage: PropTypes.string,
  notificationType: PropTypes.string,
  requestNotificationDismiss: PropTypes.func,
};


export default connect(mapStateToProps, mapDispatchToProps)(NotificationArea);
