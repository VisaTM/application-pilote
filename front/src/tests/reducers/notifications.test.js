import {
  REQUEST_NOTIFICATION_DISMISS,
} from '../../constants';
import reducer from '../../reducers/notifications';

const initialState = {
  message: null,
  type: null,
}

// TODO: test every notifications ?

describe('reducers', () => {
  describe('notifications', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    });

    it('should handle REQUEST_NOTIFICATION_DISMISS', () => {
      const mockCurrentState = {
        message: "My message",
        type: "danger",
      }

      const mockExpectedState = {
        message: null,
        type: null,
      }

      expect(reducer(mockCurrentState, {
        type: REQUEST_NOTIFICATION_DISMISS
      })).toEqual(mockExpectedState);
    });


  });

});
