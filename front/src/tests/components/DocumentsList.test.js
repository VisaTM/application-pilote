import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactTable from "react-table";


import { DocumentsList } from '../../components/ECharts/DocumentsList.jsx';

Enzyme.configure({ adapter: new Adapter() });
function setup() {
  const props = {
    documentsList: [
      {
        Title: "Title",
        Author: "Author",
        Source: "Source",
        "Publication date": "Publication date"
      },
      {
        Title: "Title",
        Author: "Author",
        Source: "Source",
        "Publication date": "Publication date"
      },
      {
        Title: "Title",
        Author: "Author",
        Source: "Source",
        "Publication date": "Publication date"
      }
    ],
    selectedCluster: {
      Name: "cluster1"
    },
    selectedTerm: {
      Term: "term1"
    },

    fetchDocumentMetadata: jest.fn()
  }

  const enzymeWrapper = shallow(<DocumentsList {...props} />)

  return {
    props,
    enzymeWrapper
  }
}




describe('Footer', () => {
  describe('DocumentsList', () => {

    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup();

      // Sub components
      expect(enzymeWrapper.find(ReactTable).exists()).toBe(true);

    });


  });
});

