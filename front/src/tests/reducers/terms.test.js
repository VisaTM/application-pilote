import {
  RECEIVE_TERMS_DATA_SUCCESS,
  RECEIVE_SELECT_TERM_SUCCESS
} from '../../constants';
import reducer from '../../reducers/terms';


const initialState = {
  list: [],
  selected: {},
  chartOptions: {}
}

describe('reducers', () => {
  describe('terms', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    });


    it('should handle RECEIVE_TERMS_DATA_SUCCESS', () => {
      const expectedTermsList = [
        {
          Term: "mathematical model",
          Reference: "003297",
          Weight: 1.001
        },
        {
          Term: "detailed examination",
          Reference: "001241",
          Weight: 1.001
        }
      ];

      expect(reducer(initialState, {
        type: RECEIVE_TERMS_DATA_SUCCESS,
        terms: expectedTermsList
      })).toEqual(
        {
          ...initialState,
          list: expectedTermsList
        }
      );
    });


    it('should handle RECEIVE_SELECT_TERM_SUCCESS', () => {
      const mockTermId = 0;
      const currentTermsList = [
        {
          Term: "mathematical model",
          Reference: "003297",
          Weight: 1.001
        },
        {
          Term: "detailed examination",
          Reference: "001241",
          Weight: 1.001
        }
      ];

      const mockExpectedSelectedTerm = {
        Term: "mathematical model",
        Reference: "003297",
        Weight: 1.001
      }

      expect(reducer(
        {
          ...initialState,
          list: currentTermsList
        },
        {
          type: RECEIVE_SELECT_TERM_SUCCESS,
          termId: mockTermId
        }
      )).toEqual(
        {
          ...initialState,
          list: currentTermsList,
          selected: mockExpectedSelectedTerm
        }
      );
    });

  });
});

