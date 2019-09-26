
import {
  RECEIVE_CLUSTERS_DATA_SUCCESS,
  RECEIVE_SELECTED_CLUSTER_UPDATE_SUCCESS,
  REQUEST_STRENGTH_RANGE_UPDATE,
} from '../../constants';
import reducer from '../../reducers/clusters';

const initialState = {
  list: [],
  links: [],
  selected: {},
  selectedRange: 0
}


describe('reducers', () => {
  describe('documents', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    });

    it('should handle RECEIVE_CLUSTERS_DATA_SUCCESS with undefined links & documents', () => {
      expect(reducer(initialState, {
        type: RECEIVE_CLUSTERS_DATA_SUCCESS
      })).toEqual({
        ...initialState,
        list: [],
        links: []
      });
    });

    it('should handle RECEIVE_CLUSTERS_DATA_SUCCESS', () => {
      const mockClustersList = [
        {
          Id: "000000",
          Name: "regional climate model"
        },
        {
          Id: "000001",
          Name: "nutrient concentration"
        }
      ];
      const mockLinksList = [
        {
          source: "000002",
          target: "000013",
          strength: 0.2012
        },
        {
          source: "000000",
          target: "000001",
          strength: 0.2012
        }
      ];

      expect(reducer(initialState, {
        type: RECEIVE_CLUSTERS_DATA_SUCCESS,
        clusters: mockClustersList,
        links: mockLinksList
      })).toEqual({
        ...initialState,
        list: mockClustersList,
        links: mockLinksList
      });
    });

    it('should handle RECEIVE_SELECTED_CLUSTER_UPDATE_SUCCESS with undefined selectedCluster', () => {

      expect(reducer(initialState, {
        type: RECEIVE_SELECTED_CLUSTER_UPDATE_SUCCESS
      })).toEqual({
        ...initialState,
        selected: {}
      });
    });

    it('should handle RECEIVE_SELECTED_CLUSTER_UPDATE_SUCCESS', () => {
      const mockSelectedCluster = {
        Id: "000000",
        Name: "regional climate model"
      };

      expect(reducer(initialState, {
        type: RECEIVE_SELECTED_CLUSTER_UPDATE_SUCCESS,
        selectedCluster: mockSelectedCluster
      })).toEqual({
        ...initialState,
        selected: mockSelectedCluster
      });
    });

    it('should handle REQUEST_STRENGTH_RANGE_UPDATE with undefined selectedRange', () => {

      expect(reducer(initialState, {
        type: REQUEST_STRENGTH_RANGE_UPDATE
      })).toEqual({
        ...initialState,
        selectedRange: 0
      });
    });

    it('should handle REQUEST_STRENGTH_RANGE_UPDATE', () => {
      const mockSelectedRange = 0.5

      expect(reducer(initialState, {
        type: REQUEST_STRENGTH_RANGE_UPDATE,
        selectedRange: mockSelectedRange
      })).toEqual({
        ...initialState,
        selectedRange: mockSelectedRange
      });
    });

  });

});
