import {
  REQUEST_NOTIFICATION_DISMISS,
} from '../constants';

let NotificationsActions = {


  requestNotificationDismiss() {
    return (dispatch) => {
        dispatch({ type: REQUEST_NOTIFICATION_DISMISS });
    };
},

};

export default NotificationsActions;
