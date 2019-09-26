import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  REQUEST_NOTIFICATION_DISMISS,
} from '../../constants';
import NotificationsActions from '../../actions/NotificationsActions';



const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const store = mockStore();

describe('actions', () => {
  describe('notifications', () => {
    beforeEach(() => {
      store.clearActions()
    });

    it('creates a REQUEST_NOTIFICATION_DISMISS when dismissing a notification', () => {

      const expectedActions = [
        { type: REQUEST_NOTIFICATION_DISMISS },
      ];

      store.dispatch(NotificationsActions.requestNotificationDismiss());
      expect(store.getActions()).toEqual(expectedActions);

    });

  });
});
