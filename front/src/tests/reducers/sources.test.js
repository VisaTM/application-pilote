import {
  RECEIVE_SOURCES_DATA_SUCCESS,
  RECEIVE_SELECT_SOURCE_SUCCESS
} from '../../constants';
import reducer from '../../reducers/sources';


const initialState = {
  list: [],
  selected: {},
  chartOptions: {}
}

describe('reducers', () => {
  describe('sources', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    });


    it('should handle RECEIVE_SOURCES_DATA_SUCCESS', () => {
      const expectedSourcesList = [
        {
          Title: "Water Resources Research",
          Label: "Water Resources Research",
        },
        {
          Title: "Journal of Geophysical Research: Solid Earth",
          Label: "Journal of Geophysical Research: Solid Earth",
        }
      ];

      expect(reducer(initialState, {
        type: RECEIVE_SOURCES_DATA_SUCCESS,
        sources: expectedSourcesList
      })).toEqual(
        {
          ...initialState,
          list: expectedSourcesList
        }
      );
    });


    it('should handle RECEIVE_SELECT_SOURCE_SUCCESS', () => {
      const mockSourceId = 0;
      const currentSourcesList = [
        {
          Title: "Water Resources Research",
          Label: "Water Resources Research",
        },
        {
          Title: "Journal of Geophysical Research: Solid Earth",
          Label: "Journal of Geophysical Research: Solid Earth",
        }
      ];

      const mockExpectedSelectedSource =
      {
        Title: "Water Resources Research",
        Label: "Water Resources Research",
      }

      expect(reducer(
        {
          ...initialState,
          list: currentSourcesList
        },
        {
          type: RECEIVE_SELECT_SOURCE_SUCCESS,
          sourceId: mockSourceId
        }
      )).toEqual(
        {
          ...initialState,
          list: currentSourcesList,
          selected: mockExpectedSelectedSource
        }
      );
    });

  });
});

